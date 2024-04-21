from flask import Flask, jsonify, request, send_from_directory
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import requests
from dotenv import load_dotenv
import os
from flask_cors import CORS
from sama_python.Input_Data import InData
import sama_python.pso as pso
import numpy as np

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://sama.eng.uwo.ca"}}, supports_credentials=True)

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "100 per hour"],
    storage_uri="memory://",
)

def get_coordinates(zipcode):
    url = f'https://nominatim.openstreetmap.org/search?q={zipcode}&format=json&limit=1'
    response = requests.get(url)
    if not response.ok:
        return None
    coordinates = response.json()
    if not coordinates:
        return None
    return coordinates[0]['lat'], coordinates[0]['lon']

def fetch_utility_rates(latitude, longitude):
    api_key = os.getenv('NREL_API_KEY')
    utility_url = f'https://developer.nrel.gov/api/utility_rates/v3.json?api_key={api_key}&lat={latitude}&lon={longitude}'
    utility_response = requests.get(utility_url)
    if not utility_response.ok:
        return None
    return utility_response.json()

@app.route("/getUtilityRates", methods=['POST'])
@limiter.limit("1000/hour")
def get_utility_rates_endpoint():
    data = request.json
    zipcode = data['zipcode']
    coordinates = get_coordinates(zipcode)
    if not coordinates:
        return jsonify({'error': 'Failed to retrieve coordinates'})
    latitude, longitude = coordinates
    utility_data = fetch_utility_rates(latitude, longitude)
    if not utility_data:
        return jsonify({'error': 'Failed to fetch utility rates'})
    return jsonify(utility_data)

def tou_hour_array_conversion(hour_array):
    hours = list()
    for i, boolVal in enumerate(hour_array):
        if boolVal:
            hours.append(i)
    return hours

def process_general_data(data):
    # zipcode = data['zipcode'] # store in database later
    loadType = data['isAnnual']
    rateStructureType = data['rateStructure']

    Input_Data = InData()

    if loadType == True: # it is annual
        Input_Data.setAnnualLoad(data['annualTotalLoad'])
    else:
        monthlyLoad = np.array([data['monthlyLoad1'], data['monthlyLoad2'], data['monthlyLoad3'], data['monthlyLoad4'], data['monthlyLoad5'], data['monthlyLoad6'], data['monthlyLoad7'], data['monthlyLoad8'], data['monthlyLoad9'], data['monthlyLoad10'], data['monthlyLoad11'], data['monthlyLoad12']])
        Input_Data.setMonthlyLoad(monthlyLoad)
    
    if rateStructureType == 'Flat Rate':
        Input_Data.setFlatRate(data['flatRate'])
    elif rateStructureType == 'Seasonal Rate':
        seasonalRates = np.array([data['seasonalRateField1'], data['seasonalRateField2']])
        Input_Data.setSeasonalRate(seasonalRates)
    elif rateStructureType == 'Monthly Rate':
        monthlyRates = np.array([data['monthlyRate1'], data['monthlyRate2'], data['monthlyRate3'], data['monthlyRate4'], data['monthlyRate5'], data['monthlyRate6'], data['monthlyRate7'], data['monthlyRate8'], data['monthlyRate9'], data['monthlyRate10'], data['monthlyRate11'], data['monthlyRate12']])
        Input_Data.setMonthlyRate(monthlyRates)
    elif rateStructureType == 'Tiered Rate':
        tieredPrices = np.array([data['lowTierPrice'], data['mediumTierPrice'], data['highTierPrice']])
        tieredLoads = np.array([data['lowTierMaxLoad'], data['mediumTierMaxLoad'], data['highTierMaxLoad']])
        Input_Data.setTieredRate(tieredPrices, tieredLoads)
    elif rateStructureType == 'Seasonal Tiered Rate':
        summerTieredPrices = np.array([data['summerLowTierPrice'], data['summerMediumTierPrice'], data['summerHighTierPrice']])
        winterTieredPrices = np.array([data['winterLowTierPrice'], data['winterMediumTierPrice'], data['winterHighTierPrice']])
        seasonalTieredPrices = np.array([summerTieredPrices, winterTieredPrices])
        summerTieredLoads = np.array([data['summerLowTierMaxLoad'], data['summerMediumTierMaxLoad'], data['summerHighTierMaxLoad']])
        winterTieredLoads = np.array([data['winterLowTierMaxLoad'], data['winterMediumTierMaxLoad'], data['winterHighTierMaxLoad']])
        seasonalTieredLoads = np.array([summerTieredLoads, winterTieredLoads])
        Input_Data.setSeasonalTieredRate(seasonalTieredPrices, seasonalTieredLoads)
    elif rateStructureType == 'Monthly Tiered Rate':
        januaryTieredPrices = np.array([data['januaryLowPrice'], data['januaryMedPrice'], data['januaryHighPrice']])
        februaryTieredPrices = np.array([data['februaryLowPrice'], data['februaryMedPrice'], data['februaryHighPrice']])
        marchTieredPrices = np.array([data['marchLowPrice'], data['marchMedPrice'], data['marchHighPrice']])
        aprilTieredPrices = np.array([data['aprilLowPrice'], data['aprilMedPrice'], data['aprilHighPrice']])
        mayTieredPrices = np.array([data['mayLowPrice'], data['mayMedPrice'], data['mayHighPrice']])
        juneTieredPrices = np.array([data['juneLowPrice'], data['juneMedPrice'], data['juneHighPrice']])
        julyTieredPrices = np.array([data['julyLowPrice'], data['julyMedPrice'], data['julyHighPrice']])
        augustTieredPrices = np.array([data['augustLowPrice'], data['augustMedPrice'], data['augustHighPrice']])
        septemberTieredPrices = np.array([data['septemberLowPrice'], data['septemberMedPrice'], data['septemberHighPrice']])
        octoberTieredPrices = np.array([data['octoberLowPrice'], data['octoberMedPrice'], data['octoberHighPrice']])
        novemberTieredPrices = np.array([data['novemberLowPrice'], data['novemberMedPrice'], data['novemberHighPrice']])
        decemberTieredPrices = np.array([data['decemberLowPrice'], data['decemberMedPrice'], data['decemberHighPrice']])
        monthlyTieredPrices = np.array([januaryTieredPrices, februaryTieredPrices, marchTieredPrices, aprilTieredPrices, mayTieredPrices, juneTieredPrices, julyTieredPrices, augustTieredPrices, septemberTieredPrices, octoberTieredPrices, novemberTieredPrices, decemberTieredPrices])
        januaryTieredLoads = np.array([data['januaryLowMaxLoad'], data['januaryMedMaxLoad'], data['januaryHighMaxLoad']])
        februaryTieredLoads = np.array([data['februaryLowMaxLoad'], data['februaryMedMaxLoad'], data['februaryHighMaxLoad']])
        marchTieredLoads = np.array([data['marchLowMaxLoad'], data['marchMedMaxLoad'], data['marchHighMaxLoad']])
        aprilTieredLoads = np.array([data['aprilLowMaxLoad'], data['aprilMedMaxLoad'], data['aprilHighMaxLoad']])
        mayTieredLoads = np.array([data['mayLowMaxLoad'], data['mayMedMaxLoad'], data['mayHighMaxLoad']])
        juneTieredLoads = np.array([data['juneLowMaxLoad'], data['juneMedMaxLoad'], data['juneHighMaxLoad']])
        julyTieredLoads = np.array([data['julyLowMaxLoad'], data['julyMedMaxLoad'], data['julyHighMaxLoad']])
        augustTieredLoads = np.array([data['augustLowMaxLoad'], data['augustMedMaxLoad'], data['augustHighMaxLoad']])
        septemberTieredLoads = np.array([data['septemberLowMaxLoad'], data['septemberMedMaxLoad'], data['septemberHighMaxLoad']])
        octoberTieredLoads = np.array([data['octoberLowMaxLoad'], data['octoberMedMaxLoad'], data['octoberHighMaxLoad']])
        novemberTieredLoads = np.array([data['novemberLowMaxLoad'], data['novemberMedMaxLoad'], data['novemberHighMaxLoad']])
        decemberTieredLoads = np.array([data['decemberLowMaxLoad'], data['decemberMedMaxLoad'], data['decemberHighMaxLoad']])
        monthlyTieredLoads = np.array([januaryTieredLoads, februaryTieredLoads, marchTieredLoads, aprilTieredLoads, mayTieredLoads, juneTieredLoads, julyTieredLoads, augustTieredLoads, septemberTieredLoads, octoberTieredLoads, novemberTieredLoads, decemberTieredLoads])
        Input_Data.setMonthlyTieredRate(monthlyTieredPrices, monthlyTieredLoads)
    elif rateStructureType == 'Time of Use':
        onPrice = np.array([data['summerOnPeakPrice'], data['winterOnPeakPrice']])
        midPrice = np.array([data['summerMidPeakPrice'], data['winterMidPeakPrice']])
        offPrice = np.array([data['summerOffPeakPrice'], data['winterOffPeakPrice']])
        onHours = np.array([tou_hour_array_conversion(data['summerOnPeakHours']), tou_hour_array_conversion(data['winterOnPeakHours'])])
        midHours = np.array([tou_hour_array_conversion(data['summerMidPeakHours']), tou_hour_array_conversion(data['winterMidPeakHours'])])
        Input_Data.setTimeOfUseRate(onPrice, midPrice, offPrice, onHours, midHours)
            
    return Input_Data

def process_advanced_data(Input_Data, data):
    if data['batteryBank']:
        Input_Data.setBatteryCost(data['C_B'])
        Input_Data.setBatteryReplacementCost(data['R_B'])
        Input_Data.setBatteryOandM(data['batteryOandM'])
        Input_Data.setSOC_min(data['SOC_min'])
        Input_Data.setSOC_max(data['SOC_max'])
        if not data['isLithium']:
            Input_Data.setLeadAcidBat(1)
            Input_Data.setLithiumBat(0)
    else:
        Input_Data.setBat(0)
    if data['photovoltaic']:
        Input_Data.setPVCost(data['PVCost'])
        Input_Data.setPVReplacementCost(data['PVReplacementCost'])
        Input_Data.setPVOandM(data['PVOandM'])
        Input_Data.setPVLifetime(data['PVLifetime'])
    else:
        Input_Data.setPV(0)
    if data['dieselGenerator']:
        Input_Data.setDGCost(data['C_DG'])
        Input_Data.setDGReplacementCost(data['R_DG'])
        Input_Data.setDGOandM(data['MO_DG'])
        Input_Data.setDGLifetime(data['TL_DG'])
    else:
        Input_Data.setDG(0)
        
    if data['netMetered']:
        Input_Data.setNEM(1)
    if not data['connectedToGrid']:
        Input_Data.isGrid(0)
        Input_Data.setNEM(0)

    Input_Data.projectLifetime(data['n'])
    Input_Data.setLPSP_max_rate(data['LPSP_max_rate'])
    Input_Data.setRE_min_rate(data['RE_min_rate'])
    Input_Data.sete_ir_rate(data['e_ir_rate'])
    Input_Data.setn_ir_rate(data['n_ir_rate'])
    Input_Data.setir(data['ir'])

    return Input_Data

@app.route("/submit/general", methods=['POST'])
def submit_general():
    try:
        data = request.json
        Input_Data = process_general_data(data)
        answer = pso.run(Input_Data)
        return jsonify(answer)
    except Exception as e:
        app.logger.error(f'Error in submit_general: {e}')
        return jsonify({'error': 'An unexpected error occurred'}), 500

@app.route('/submit/advanced', methods=['POST'])
def submit_advanced():
    try:
        data = request.json
        Input_Data = process_general_data(data)
        Input_Data = process_advanced_data(Input_Data, data)
        answer = pso.run(Input_Data)
        return jsonify(answer)
    except Exception as e:
        app.logger.error(f'Error in submit_advanced: {e}')
        return jsonify({'error': 'An unexpected error occurred'}), 500

@app.route("/images/<filename>")
def send_image(filename):
    return send_from_directory("sama_python/output/figs", filename)
