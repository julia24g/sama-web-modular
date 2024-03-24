from flask import Flask, jsonify, request, send_from_directory
import requests
from dotenv import load_dotenv
import os
from flask_cors import CORS
from sama_python.Input_Data import InData
import sama_python.pso as pso
import numpy as np

load_dotenv()
app = Flask(__name__)
CORS(app)

global_general_answer = None
global_advanced_answer = None

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

def process_general_data(data):
    zipcode = data['zipcode'] # store in database later
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
        seasonalRates = np.array([data['summerRate'], data['winterRate']])
        Input_Data.setSeasonalRate(seasonalRates)
    elif rateStructureType == 'Monthly Rate':
        monthlyRates = np.array([data['monthlyRate1'], data['monthlyRate2'], data['monthlyRate3'], data['monthlyRate4'], data['monthlyRate5'], data['monthlyRate6'], data['monthlyRate7'], data['monthlyRate8'], data['monthlyRate9'], data['monthlyRate10'], data['monthlyRate11'], data['monthlyRate12']])
        Input_Data.setMonthlyRate(monthlyRates)
    elif rateStructureType == 'Tiered Rate':
        tieredPrices = np.array([data['lowTierPrice'], data['midTierPrice'], data['highTierPrice']])
        tieredLoads = np.array([data['lowTierMaxLoad'], data['midTierMaxLoad'], data['highTierMaxLoad']])
        Input_Data.setTieredRate(tieredPrices, tieredLoads)
    elif rateStructureType == 'Seasonal Tiered Rate':
        summerTieredPrices = np.array([data['summerLowTierPrice'], data['summerMidTierPrice'], data['summerHighTierPrice']])
        winterTieredPrices = np.array([data['winterLowTierPrice'], data['winterMidTierPrice'], data['winterHighTierPrice']])
        seasonalTieredPrices = np.array([summerTieredPrices, winterTieredPrices])
        summerTieredLoads = np.array([data['summerLowTierMaxLoad'], data['summerMidTierMaxLoad'], data['summerHighTierMaxLoad']])
        winterTieredLoads = np.array([data['winterLowTierMaxLoad'], data['winterMidTierMaxLoad'], data['winterHighTierMaxLoad']])
        seasonalTieredLoads = np.array([summerTieredLoads, winterTieredLoads])
        Input_Data.setSeasonalTieredRate(seasonalTieredPrices, seasonalTieredLoads)
    elif rateStructureType == 'Monthly Tiered Rate':
        januaryTieredPrices = np.array([data['januaryLowPrice'], data['januaryMidPrice'], data['januaryHighPrice']])
        februaryTieredPrices = np.array([data['februaryLowPrice'], data['februaryMidPrice'], data['februaryHighPrice']])
        marchTieredPrices = np.array([data['marchLowPrice'], data['marchMidPrice'], data['marchHighPrice']])
        aprilTieredPrices = np.array([data['aprilLowPrice'], data['aprilMidPrice'], data['aprilHighPrice']])
        mayTieredPrices = np.array([data['mayLowPrice'], data['mayMidPrice'], data['mayHighPrice']])
        juneTieredPrices = np.array([data['juneLowPrice'], data['juneMidPrice'], data['juneHighPrice']])
        julyTieredPrices = np.array([data['julyLowPrice'], data['julyMidPrice'], data['julyHighPrice']])
        augustTieredPrices = np.array([data['augustLowPrice'], data['augustMidPrice'], data['augustHighPrice']])
        septemberTieredPrices = np.array([data['septemberLowPrice'], data['septemberMidPrice'], data['septemberHighPrice']])
        octoberTieredPrices = np.array([data['octoberLowPrice'], data['octoberMidPrice'], data['octoberHighPrice']])
        novemberTieredPrices = np.array([data['novemberLowPrice'], data['novemberMidPrice'], data['novemberHighPrice']])
        decemberTieredPrices = np.array([data['decemberLowPrice'], data['decemberMidPrice'], data['decemberHighPrice']])
        monthlyTieredPrices = np.array([januaryTieredPrices, februaryTieredPrices, marchTieredPrices, aprilTieredPrices, mayTieredPrices, juneTieredPrices, julyTieredPrices, augustTieredPrices, septemberTieredPrices, octoberTieredPrices, novemberTieredPrices, decemberTieredPrices])
        januaryTieredLoads = np.array([data['januaryLowMaxLoad'], data['januaryMidMaxLoad'], data['januaryHighMaxLoad']])
        februaryTieredLoads = np.array([data['februaryLowMaxLoad'], data['februaryMidMaxLoad'], data['februaryHighMaxLoad']])
        marchTieredLoads = np.array([data['marchLowMaxLoad'], data['marchMidMaxLoad'], data['marchHighMaxLoad']])
        aprilTieredLoads = np.array([data['aprilLowMaxLoad'], data['aprilMidMaxLoad'], data['aprilHighMaxLoad']])
        mayTieredLoads = np.array([data['mayLowMaxLoad'], data['mayMidMaxLoad'], data['mayHighMaxLoad']])
        juneTieredLoads = np.array([data['juneLowMaxLoad'], data['juneMidMaxLoad'], data['juneHighMaxLoad']])
        julyTieredLoads = np.array([data['julyLowMaxLoad'], data['julyMidMaxLoad'], data['julyHighMaxLoad']])
        augustTieredLoads = np.array([data['augustLowMaxLoad'], data['augustMidMaxLoad'], data['augustHighMaxLoad']])
        septemberTieredLoads = np.array([data['septemberLowMaxLoad'], data['septemberMidMaxLoad'], data['septemberHighMaxLoad']])
        octoberTieredLoads = np.array([data['octoberLowMaxLoad'], data['octoberMidMaxLoad'], data['octoberHighMaxLoad']])
        novemberTieredLoads = np.array([data['novemberLowMaxLoad'], data['novemberMidMaxLoad'], data['novemberHighMaxLoad']])
        decemberTieredLoads = np.array([data['decemberLowMaxLoad'], data['decemberMidMaxLoad'], data['decemberHighMaxLoad']])
        monthlyTieredLoads = np.array([januaryTieredLoads, februaryTieredLoads, marchTieredLoads, aprilTieredLoads, mayTieredLoads, juneTieredLoads, julyTieredLoads, augustTieredLoads, septemberTieredLoads, octoberTieredLoads, novemberTieredLoads, decemberTieredLoads])
        Input_Data.setMonthlyTieredRate(monthlyTieredPrices, monthlyTieredLoads)
    elif rateStructureType == 'Time of Use':
        onPrice = np.array([data['summerOnPeakPrice'], data['winterOnPeakPrice']])
        midPrice = np.array([data['summerMidPeakPrice'], data['winterMidPeakPrice']])
        offPrice = np.array([data['summerOffPeakPrice'], data['winterOffPeakPrice']])
        onHours = np.array([data['summerOnPeakHours'], data['winterOnPeakHours']])
        midHours = np.array([data['summerMidPeakHours'], data['winterMidPeakHours']])
        Input_Data.setTimeOfUseRate(onPrice, midPrice, offPrice, onHours, midHours)
        
    return Input_Data

def process_advanced_data(Input_Data, data):
    if data['batteryBank'] == True:
        Input_Data.isBat()
    if data['photovoltaic'] == True:
        Input_Data.isBat()
    if data['dieselGenerator'] == True:
        Input_Data.isDG()
    if data['connectedToGrid'] == True:
        Input_Data.isGrid()
    if data['netMetered'] == True:
        Input_Data.isNEM()
    
    Input_Data.projectLifetime(data['n'])
    Input_Data.setLPSP_max_rate(data['LSPS_max_rate'])
    Input_Data.setRE_min_rate(data['RE_min_rate'])
    Input_Data.sete_ir_rate(data['e_ir_rate'])
    Input_Data.setn_ir_rate(data['n_ir_rate'])
    Input_Data.setir(data['ir'])
    
    Input_Data.setPVCost(data['PVCost'])
    Input_Data.setPVReplacementCost(data['PVReplacementCost'])
    Input_Data.setPVOandM(data['PVOandM'])
    Input_Data.setPVLifetime(data['PVLifetime'])

    Input_Data.setBatteryCost(data['C_B'])
    Input_Data.setBatteryReplacementCost(data['R_B'])
    Input_Data.setBatteryOandM(data['batteryOandM'])
    Input_Data.setSOC_min(data['SOC_min'])
    Input_Data.setSOC_max(data['SOC_max'])
    Input_Data.setBatteryVoltage(data['batteryVoltage'])

    Input_Data.setDGCost(data['C_DG'])
    Input_Data.setDGReplacementCost(data['R_DG'])
    Input_Data.setDGOandM(data['MO_DG'])
    Input_Data.setDGLifetime(data['TL_DG'])

@app.route("/submit/general", methods=['POST'])
def submit_general():
    global global_general_answer  # Declare it as global within your function
    data = request.json
    Input_Data = process_general_data(data)
    global_general_answer = pso.run(Input_Data)
    return jsonify({'message': 'General calculator processing complete'})

@app.route('/submit/advanced', methods=['POST'])
def submit_advanced():
    global global_advanced_answer
    data = request.json
    Input_Data = process_general_data(data)
    process_advanced_data(Input_Data, data)
    global_advanced_answer = pso.run()
    return jsonify({'message': 'Advanced calculator processing complete'})

@app.route("/results", methods=['GET'])
def display_results():
    global global_general_answer  # Declare it as global within your function
    if global_general_answer is not None:
        return jsonify(global_general_answer)  # Return the stored answer
    else:
        return jsonify({'error': 'No results available yet'})

@app.route("/images/<filename>")
def send_image(filename):
    return send_from_directory("sama_python/output/figs", filename)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
    print('Starting Flask!')
