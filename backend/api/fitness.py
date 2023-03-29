# from api.input_data import *
# from api.ems import energy_management


import numpy as np
from ems import energy_management
from input_data import InData


def fitness(X, not_results=True):
    if (len(X)) == 1:
        X = X[0]

    NT = len(InData.Eload)  # time step numbers
    Npv = round(X[0])  # PV number
    Nwt = round(X[1])  # WT number
    Nbat = round(X[2])  # Battery pack number
    N_DG = round(X[3])  # number of Diesel Generator
    Cn_I = X[4]  # Inverter Capacity

    Pn_PV = Npv * InData.Ppv_r  # PV Total Capacity
    Pn_WT = Nwt * InData.Pwt_r  # WT Total Capacity
    Cn_B = Nbat * InData.Cbt_r  # Battery Total Capacity
    Pn_DG = N_DG * InData.Cdg_r  # Diesel Total Capacity

    # %% PV Power Calculation
    Tc = InData.T + (((InData.Tnoct - 20) / 800) * InData.G)  # Module Temprature
    Ppv = InData.fpv * Pn_PV * (InData.G / InData.Gref) * (
                1 + InData.Tcof * (Tc - InData.Tref))  # output power(kw)_hourly

    # %% Wind turbine Power Calculation
    v1 = InData.Vw  # hourly wind speed
    v2 = ((InData.h_hub / InData.h0) ** (
        InData.alfa_wind_turbine)) * v1  # v1 is the speed at a reference heightv2 is the speed at a hub height h2
    Pwt = np.zeros(8760)

    Pwt[v2 < InData.v_cut_in] = 0
    Pwt[v2 > InData.v_cut_out] = 0
    true_value = np.logical_and(InData.v_cut_in <= v2, v2 < InData.v_rated)
    Pwt[np.logical_and(InData.v_cut_in <= v2, v2 < InData.v_rated)] = v2[true_value] ** 3 * (
            InData.Pwt_r / (InData.v_rated ** 3 - InData.v_cut_in ** 3)) - (InData.v_cut_in ** 3 / (InData.v_rated
                                                                                                    ** 3 - InData.v_cut_in ** 3)) * InData.Pwt_r
    Pwt[np.logical_and(InData.v_rated <= v2, v2 < InData.v_cut_out)] = InData.Pwt_r
    Pwt = Pwt * Nwt

    # %% Energy Management 
    # % Battery Wear Cost
    if Cn_B > 0:
        Cbw = InData.R_B * Cn_B / (Nbat * InData.Q_lifetime * np.sqrt(InData.ef_bat))
    else:
        Cbw = 0

    #  DG Fix cost
    cc_gen = InData.b * Pn_DG * InData.C_fuel + InData.R_DG * Pn_DG / InData.TL_DG + InData.MO_DG

    (Eb, Pdg, Edump, Ens, Pch, Pdch, Pbuy, Psell, Pinv) = \
        energy_management(Ppv, Pwt, InData.Eload, Cn_B, Nbat, Pn_DG, NT,
                          InData.SOC_max, InData.SOC_min, InData.SOC_initial,
                          InData.n_I, InData.Grid, InData.Cbuy, InData.a, Cn_I, InData.LR_DG, InData.C_fuel,
                          InData.Pbuy_max, InData.Psell_max, cc_gen, Cbw, InData.self_discharge_rate,
                          InData.alfa_battery, InData.c, InData.k, InData.Imax, InData.Vnom, InData.ef_bat)

    q = (InData.a * Pdg + InData.b * Pn_DG) * (Pdg > 0)  # Fuel consumption of a diesel generator 

    # %% installation and operation cost

    # Total Investment cost ($)
    I_Cost = InData.C_PV * Pn_PV + InData.C_WT * Pn_WT + InData.C_DG * Pn_DG + InData.C_B * Cn_B + InData.C_I * Cn_I + \
             InData.C_CH

    Top_DG = np.sum(Pdg > 0) + 1
    L_DG = InData.TL_DG / Top_DG
    RT_DG = np.ceil(InData.n / L_DG) - 1  # Replecement time

    # Total Replacement cost ($)
    RC_PV = np.zeros(InData.n)
    RC_WT = np.zeros(InData.n)
    RC_DG = np.zeros(InData.n)
    RC_B = np.zeros(InData.n)
    RC_I = np.zeros(InData.n)
    RC_CH = np.zeros(InData.n)

    RC_PV[np.arange(InData.L_PV + 1, InData.n, InData.L_PV)] = InData.R_PV * Pn_PV / (1 + InData.ir) ** \
                                                               (np.arange(1.001 * InData.L_PV, InData.n, InData.L_PV))
    RC_WT[np.arange(InData.L_WT + 1, InData.n, InData.L_WT)] = InData.R_WT * Pn_WT / \
                                                               (1 + InData.ir) ** (
                                                                   np.arange(1.001 * InData.L_WT, InData.n,
                                                                             InData.L_WT))
    RC_DG[np.arange(L_DG + 1, InData.n, L_DG).astype(np.int32)] = InData.R_DG * Pn_DG / (1 + InData.ir) ** (
        np.arange(1.001 * L_DG, InData.n, L_DG))
    RC_B[np.arange(InData.L_B + 1, InData.n, InData.L_B)] = InData.R_B * Cn_B / (1 + InData.ir) ** \
                                                            (np.arange(1.001 * InData.L_B, InData.n, InData.L_B))
    RC_I[np.arange(InData.L_I + 1, InData.n, InData.L_I)] = InData.R_I * Cn_I / (1 + InData.ir) ** \
                                                            (np.arange(1.001 * InData.L_I, InData.n, InData.L_I))
    RC_CH[np.arange(InData.L_CH + 1, InData.n, InData.L_CH)] = InData.R_CH / (1 + InData.ir) ** \
                                                               (np.arange(1.001 * InData.L_CH, InData.n, InData.L_CH))
    R_Cost = RC_PV + RC_WT + RC_DG + RC_B + RC_I + RC_CH

    # Total M&O Cost ($/year)
    MO_Cost = (InData.MO_PV * Pn_PV + InData.MO_WT * Pn_WT + InData.MO_DG * np.sum(Pn_DG > 0) + \
               InData.MO_B * Cn_B + InData.MO_I * Cn_I + InData.MO_CH) / (1 + InData.ir) ** \
              np.array(range(1, InData.n + 1))

    # DG fuel Cost
    C_Fu = sum(InData.C_fuel * q) / (1 + InData.ir) ** np.array(range(1, InData.n + 1))

    # Salvage
    L_rem = (InData.RT_PV + 1) * InData.L_PV - InData.n
    S_PV = (InData.R_PV * Pn_PV) * L_rem / InData.L_PV * 1 / (1 + InData.ir) ** InData.n  # PV
    L_rem = (InData.RT_WT + 1) * InData.L_WT - InData.n
    S_WT = (InData.R_WT * Pn_WT) * L_rem / InData.L_WT * 1 / (1 + InData.ir) ** InData.n  # WT
    L_rem = (RT_DG + 1) * L_DG - InData.n
    S_DG = (InData.R_DG * Pn_DG) * L_rem / L_DG * 1 / (1 + InData.ir) ** InData.n  # DG
    L_rem = (InData.RT_B + 1) * InData.L_B - InData.n
    S_B = (InData.R_B * Cn_B) * L_rem / InData.L_B * 1 / (1 + InData.ir) ** InData.n
    L_rem = (InData.RT_I + 1) * InData.L_I - InData.n
    S_I = (InData.R_I * Cn_I) * L_rem / InData.L_I * 1 / (1 + InData.ir) ** InData.n
    L_rem = (InData.RT_CH + 1) * InData.L_CH - InData.n
    S_CH = (InData.R_CH) * L_rem / InData.L_CH * 1 / (1 + InData.ir) ** InData.n
    Salvage = S_PV + S_WT + S_DG + S_B + S_I + S_CH

    # Emissions produced by Disesl generator (g)
    DG_Emissions = np.sum(q * (InData.CO2 + InData.NOx + InData.SO2)) / 1000  # total emissions (kg/year)
    Grid_Emissions = np.sum(Pbuy * (InData.E_CO2 + InData.E_SO2 + InData.E_NOx)) / 1000  # total emissions (kg/year)

    Grid_Cost = (np.sum(Pbuy * InData.Cbuy) - np.sum(Psell * InData.Csell)) * 1 / (1 + InData.ir) ** \
                np.array(range(1, InData.n + 1))

    # Capital recovery factor
    CRF = InData.ir * (1 + InData.ir) ** InData.n / ((1 + InData.ir) ** InData.n - 1)

    # Totall Cost
    NPC = I_Cost + np.sum(R_Cost) + np.sum(MO_Cost) + np.sum(C_Fu) - Salvage + np.sum(Grid_Cost)

    Operating_Cost = CRF * (np.sum(R_Cost) + np.sum(MO_Cost) + np.sum(C_Fu) - Salvage + np.sum(Grid_Cost))

    if np.sum(InData.Eload - Ens) > 1:
        LCOE = CRF * NPC / np.sum(InData.Eload - Ens + Psell)  # Levelized Cost of Energy ($/kWh)
        LEM = (DG_Emissions + Grid_Emissions) / sum(InData.Eload - Ens)  # Levelized Emissions(kg/kWh)
    else:
        LCOE = 100
        LEM = 100
    LPSP = np.sum(Ens) / np.sum(InData.Eload)
    RE = 1 - np.sum(Pdg + Pbuy) / np.sum(InData.Eload + Psell - Ens)
    if (np.isnan(RE)):
        RE = 0

    if not_results:

        Z = LCOE + InData.EM * LEM + 10 * (LPSP > InData.LPSP_max) + 10 * (RE < InData.RE_min) + 100 * \
            (I_Cost > InData.Budget) + 100 * max(0, LPSP - InData.LPSP_max) + 100 * max(0, InData.RE_min - RE) + \
            100 * max(0, I_Cost - InData.Budget)

        return Z
    else:
        # %%
        Investment = np.zeros(InData.n)
        Investment[0] = I_Cost
        Salvage1 = np.zeros(InData.n)
        Salvage1[InData.n - 1] = Salvage
        Salvage1[0] = 0
        Salvage = Salvage1
        Operating = np.zeros(InData.n)
        Operating[0:InData.n + 1] = InData.MO_PV * Pn_PV + InData.MO_WT * Pn_WT + InData.MO_DG * Pn_DG + InData.MO_B *\
                                    Cn_B + InData.MO_I * Cn_I + sum(Pbuy * InData.Cbuy) - sum(Psell * InData.Csell)
        Fuel = np.zeros(InData.n)
        Fuel[0:InData.n + 1] = sum(InData.C_fuel * q)
        return RC_PV, Pn_PV, RC_WT, Pn_WT, RC_DG, L_DG, Pn_DG, RC_B, Cn_B, RC_I, Cn_I, Investment, Operating, Salvage, \
               Fuel, NPC, LCOE, Operating_Cost, I_Cost, RE, MO_Cost, LPSP, Edump, Pbuy, Grid_Cost, Psell, LEM, Ppv, \
               Pwt, Pdg, DG_Emissions, Grid_Emissions, Ens, q, Pch, Pdch, Eb



