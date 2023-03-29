from fitness import fitness
import numpy as np
from time import time
from input_data import InData
import matplotlib.pyplot as plt
from ems import energy_management


class PsoParticle:
    """
    This class represents one particle of the population. a possible solution to the problem
    """

    def __init__(self, position, velocity):
        self.position = position  # the position of the particle
        self.velocity = velocity  # the velocity of the particle
        self.fitness_value = None  # every possible solution has its fitness value.
        self.p_best_position = None
        self.p_best_fitness = None


class PSO:
    """
        This class consists of the methods needed to run the PSO algorithm
    """

    def __init__(self):
        # parameters of the PSO
        self.number_of_variables = InData.number_of_variables
        self.maximum_iteration = 100
        self.population_size = 50
        self.current_iteration = 0

        self.g_best_position = None  # the particle that represents the best solution of the optimization process
        self.g_best_fitness = None
        self.particles = None  # the population of particles

        self.w_initial = 0.9  # Inertia Weight - initial value
        self.w_final = 0.2  # Inertia Weight - final value
        self.c_pbest_initial = 2  # Personal Learning Coefficient - initial value
        self.c_pbest_final = 0.8  # Personal Learning Coefficient - final value
        self.c_gbest_initial = 0.6  # Global Learning Coefficient - initial value
        self.c_gbest_final = 2  # Global Learning Coefficient - final value

        # Variables limits
        self.minimum_var_range = InData.minimum_var_range
        self.maximum_var_range = InData.maximum_var_range
        # Velocity Limits

        self.maximum_velocity = 0.3 * (InData.maximum_var_range - InData.minimum_var_range)
        self.minimum_velocity = -1 * self.maximum_velocity

    # The __str__() method returns a human-readable, or informal,
    # string representation of an object. This method is called by the built-in print()
    # , str() , and format() functions.
    def __str__(self):
        return f'{self.g_best_position} , {self.g_best_fitness}'

    def initial_population(self):
        """
        Creates initial population.
        """

        init_population = []
        for k in range(self.population_size):
            x = np.random.uniform(self.minimum_var_range, self.maximum_var_range, (1, self.number_of_variables))
            v = np.random.uniform(self.minimum_velocity, self.maximum_velocity, (1, self.number_of_variables))
            init_population.append(PsoParticle(x, v))

        return init_population

    def adaptive_parameters_cal(self):
        """
         this method is calling during iterations to update values of inertia weight (W) and C1  and C2
        """
        w = self.w_initial + (self.w_final - self.w_initial) * self.current_iteration / self.maximum_iteration

        c_pbest = self.c_pbest_initial + (self.c_pbest_final - self.c_pbest_initial) * self.current_iteration / self. \
            maximum_iteration

        c_gbest = self.c_gbest_initial + (self.c_gbest_final - self.c_gbest_initial) * self.current_iteration / self. \
            maximum_iteration

        return w, c_pbest, c_gbest

    def position_limiter(self, particle):
        """
        to modify particles positions to be in the boundaries
        """
        particle.position = np.minimum(np.maximum(particle.position, self.minimum_var_range), self.maximum_var_range)

    def velocity_limiter(self, particle):
        """
        to modify particles velocities to be in the boundaries
        """
        particle.velocity = np.minimum(np.maximum(particle.velocity, self.minimum_velocity), self.maximum_velocity)

    def particles_evaluation(self):
        """
        to calculate fitness values of each particle
        """
        for particle in self.particles:
            particle.fitness_value = fitness(particle.position)

    def p_best_update(self):
        """
               to update personal best experience of every particle
        """
        for particle in self.particles:
            if particle.p_best_fitness:
                if particle.fitness_value < particle.p_best_fitness:
                    particle.p_best_fitness = particle.fitness_value
                    particle.p_best_position = particle.position
            else:
                particle.p_best_fitness = particle.fitness_value
                particle.p_best_position = particle.position

    def g_best_update(self):
        """
               to update global best experience of every particle
        """
        for particle in self.particles:
            if self.g_best_fitness:
                if particle.fitness_value < self.g_best_fitness:
                    self.g_best_fitness = particle.fitness_value
                    self.g_best_position = particle.position
            else:
                self.g_best_fitness = particle.fitness_value
                self.g_best_position = particle.position

    def velocity_position_update(self):
        """
               to update the velocity and position of every particle
        """
        # adaptive parameters calculations during each iteration
        w, c_pbest, c_gbest = self.adaptive_parameters_cal()
        for particle in self.particles:
            randp = np.random.uniform(0, 1, (1, self.number_of_variables))
            randg = np.random.uniform(0, 1, (1, self.number_of_variables))
            particle.velocity = w * particle.velocity + c_pbest * np.multiply(randp,
                                                                              particle.p_best_position - particle.position
                                                                              ) \
                                + c_gbest * np.multiply(randg, self.g_best_position - particle.position)

            self.velocity_limiter(particle)

            particle.position = particle.position + particle.velocity

            self.position_limiter(particle)

    def run(self):

        start_time = time()
        self.particles = self.initial_population()
        best_values = []
        while self.current_iteration < self.maximum_iteration:
            print(f"Iteration: {self.current_iteration}")

            # evaluating the particles
            self.particles_evaluation()

            # updating the Pbests
            self.p_best_update()

            # updating the Gbests
            self.g_best_update()

            # updating the velocities and positions
            self.velocity_position_update()

            # incrementing iterations
            self.current_iteration += 1

            best_values.append([self.current_iteration, self.g_best_fitness])
            print(f"Current best solution: {self}")
            print()

        end_time = time()
        hours, rem = divmod(end_time - start_time, 3600)  # The divmod() method takes two numbers as arguments and
        # returns their quotient and remainder in a tuple.
        minutes, seconds = divmod(rem, 60)

        iterations, values = zip(*best_values)  # we are extracting iterations and respective
        # values by zip function, And the asterisk before the iterable means that
        # we can give any number of arguments.
        plot_convergence(iterations, values)
        print()
        print(f"Final best solution:{self}")
        print('Time: {:0>2}:{:0>2}:{:05.2f}'.format(int(hours), int(minutes), seconds))

        print("------Results------")
        RC_PV, Pn_PV, RC_WT, Pn_WT, RC_DG, L_DG, Pn_DG, RC_B, Cn_B, RC_I, Cn_I, Investment, Operating, Salvage, Fuel, \
        NPC, LCOE, Operating_Cost, I_Cost, RE, MO_Cost, LPSP, Edump, Pbuy, Grid_Cost, Psell, LEM, Ppv, Pwt, Pdg, \
        DG_Emissions, Grid_Emissions, Ens, q, Pch, Pdch, Eb = fitness(self.g_best_position, not_results=False)

        # %%
        import matplotlib.pyplot as plt
        RC_PV[np.arange(InData.L_PV + 1, InData.n, InData.L_PV)] = InData.R_PV * Pn_PV
        RC_WT[np.arange(InData.L_WT + 1, InData.n, InData.L_WT)] = InData.R_WT * Pn_WT
        RC_DG[np.arange(L_DG + 1, InData.n, L_DG).astype(np.int32)] = InData.R_DG * Pn_DG
        RC_B[np.arange(InData.L_B + 1, InData.n, InData.L_B)] = InData.R_B * Cn_B
        RC_I[np.arange(InData.L_I + 1, InData.n, InData.L_I)] = InData.R_I * Cn_I
        Replacement = RC_PV + RC_WT + RC_DG + RC_B + RC_I;

        Cash_Flow = np.zeros((len(Investment), 5))
        Cash_Flow[:, 0] = -Investment
        Cash_Flow[:, 1] = -Operating
        Cash_Flow[:, 2] = Salvage
        Cash_Flow[:, 3] = -Fuel
        Cash_Flow[:, 4] = -Replacement

        plt.figure()
        for kk in range(5):
            plt.bar(range(0, 25), Cash_Flow[:, kk])
        plt.legend(['Capital', 'Operating', 'Salvage', 'Fuel', 'Replacement'])
        plt.title('Cash Flow')
        plt.xlabel('Year')
        plt.ylabel('$')

        # ///
        print(' ')
        print('System Size ')
        print('Cpv  (kW) = ', str(Pn_PV))
        print('Cwt  (kW) = ', str(Pn_WT))
        print('Cbat (kWh) = ', str(Cn_B))
        print('Cdg  (kW) = ', str(Pn_DG))
        print('Cinverter (kW) = ', str(Cn_I))

        print(' ')
        print('Result: ')
        print('NPC  = ', str(NPC), ' $ ')
        print('LCOE  = ', str(LCOE), ' $/kWh ')
        print('Operation Cost  = ', str(Operating_Cost), ' $ ')
        print('Initial Cost  =, ', str(I_Cost), ' $ ')
        print('RE  = ', str(100 * RE), ' % ')
        print('Total operation and maintainance cost  = ', str(sum(MO_Cost)), ' $ ')

        print('LPSP  = ', str(100 * LPSP), ' % ')
        print('excess Elecricity = ', str(sum(Edump)))

        print('Total power bought from Grid= ', str(sum(Pbuy)), ' kWh ')
        print('Total Money paid to the Grid= ', str(sum(Grid_Cost)), ' $ ')
        print('Total Money paid by the user= ', str(np.sum(NPC)), ' $ ')
        print('Grid Sales = ', str(sum(Psell)), ' kWh ')
        print('LEM  = ', str(LEM), ' kg/kWh ')
        print('PV Power  = ', str(sum(Ppv)), ' kWh ')
        print('WT Power  = ', str(sum(Pwt)), ' kWh ')
        print('DG Power  = ', str(sum(Pdg)), ' kWh ')
        print('total fuel consumed by DG   = ', str(sum(q)), ' (kg/year) ')

        print('DG Emissions   = ', str(DG_Emissions), ' (kg/year) ')
        print('Grid Emissions   = ', str(Grid_Emissions), ' (kg/year) ')

        # Plot Results

        plt.figure()
        plt.plot(Pbuy)
        plt.plot(Psell)
        plt.legend(['Buy', 'sell'])
        plt.ylabel('Pgrid (kWh)')
        plt.xlabel('t(hour)')

        plt.figure()
        plt.plot(InData.Eload - Ens, 'b-.')
        plt.plot(Pdg, 'r')
        plt.plot(Pch - Pdch, 'g')
        plt.plot(Ppv + Pwt, '--')
        plt.legend(['Load-Ens', 'Pdg', 'Pbat', 'P_{RE}'])

        plt.figure()
        plt.plot(Eb / Cn_B)
        plt.title('State of Charge')
        plt.ylabel('SOC')
        plt.xlabel('t[hour]')

        # Plot results for one specific day
        Day = 180;
        t1 = Day * 24 + 1;
        t2 = Day * 24 + 24;

        plt.figure(figsize=(10, 10))
        plt.title(['Results for ', str(Day), ' -th day'])
        plt.subplot(4, 4, 1)
        plt.plot(InData.Eload)
        plt.title('Load Profile')
        plt.ylabel('E_{load} [kWh]')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])

        plt.subplot(4, 4, 5)
        plt.plot(InData.Eload)
        plt.title('Load Profile')
        plt.ylabel('E_{load} [kWh]')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])

        plt.subplot(4, 4, 2)
        plt.plot(InData.G)
        plt.title('Plane of Array Irradiance')
        plt.ylabel('G[W/m^2]')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])

        plt.subplot(4, 4, 6)
        plt.plot(InData.T)
        plt.title('Ambient Temperature')
        plt.ylabel('T[^o C]')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])

        plt.subplot(4, 4, 3)
        plt.plot(Ppv)
        plt.title('PV Power')
        plt.ylabel('P_{pv} [kWh]')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])

        plt.subplot(4, 4, 4)
        plt.plot(Ppv)
        plt.title('PV Power')
        plt.ylabel('P_{pv} [kWh]')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])

        plt.subplot(4, 4, 7)
        plt.plot(Pwt)
        plt.title('WT Energy')
        plt.ylabel('P_{wt} [kWh]')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])
        plt.subplot(4, 4, 8)
        plt.plot(Pwt)
        plt.title('WT Energy')
        plt.ylabel('P_{wt} [kWh]')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])

        plt.subplot(4, 4, 9)
        plt.plot(Pdg)
        plt.title('Diesel Generator Energy')
        plt.ylabel('E_{DG} [kWh]')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])
        plt.subplot(4, 4, 10)
        plt.plot(Pdg)
        plt.title('Diesel Generator Energy')
        plt.ylabel('E_{DG} [kWh]')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])

        plt.subplot(4, 4, 11)
        plt.plot(Eb)
        plt.title('Battery Energy Level')
        plt.ylabel('E_{b} [kWh]')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])

        plt.subplot(4, 4, 12)
        plt.plot(Eb / Cn_B)
        plt.title('State of Charge')
        plt.ylabel('SOC')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])

        plt.subplot(4, 4, 13)
        plt.plot(Ens)
        plt.title('Loss of Power Suply')
        plt.ylabel('LPS[kWh]')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])

        plt.subplot(4, 4, 14)
        plt.plot(Edump)
        plt.title('Dumped Energy')
        plt.ylabel('E_{dump} [kWh]')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])

        plt.subplot(4, 4, 15)
        plt.bar(range(len(Pdch)), Pdch)
        plt.title('Battery decharge Energy')
        plt.ylabel('E_{dch} [kWh]')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])

        plt.subplot(4, 4, 16)
        plt.bar(range(len(Pdch)), Pch)
        plt.title('Battery charge Energy')
        plt.ylabel('E_{ch} [kWh]')
        plt.xlabel('t[hour]')
        plt.xlim([t1, t2])


def plot_convergence(x, y):
    # plt.ion
    plt.figure()
    plt.plot(x, y, color='r')
    plt.grid()
    plt.xlabel("Iteration")
    plt.ylabel("Objective value")
    plt.title("Convergence characteristic")
    # plt.xticks(x, x)
    # plt.savefig('Convergence.jpg')
    plt.ioff()
    plt.draw()


# -------running the algorithm
my_pso = PSO()
my_pso.run()
plt.show()
