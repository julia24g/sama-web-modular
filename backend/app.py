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
from zipcode_mapping import zipcode_mapping

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "100 per hour"],
    storage_uri="memory://",
)

def get_coordinates(zipcode):
    if zipcode in zipcode_mapping:
        return zipcode_mapping[zipcode]
    else:
        url = f'https://nominatim.openstreetmap.org/search?q={zipcode}&format=json&limit=1'
        response = requests.get(url)
        if not response.ok:
            return None
        coordinates = response.json()
        if not coordinates:
            return None
        zipcode_mapping[zipcode] = coordinates[0]['lat'], coordinates[0]['lon']
        return zipcode_mapping[zipcode]

def fetch_utility_rates(latitude, longitude):
    api_key = os.getenv('NREL_API_KEY')
    utility_url = f'https://developer.nrel.gov/api/utility_rates/v3.json?api_key={api_key}&lat={latitude}&lon={longitude}'
    utility_response = requests.get(utility_url)
    if not utility_response.ok:
        return None
    return utility_response.json()

@app.route("/status", methods=['GET'])
def get_status():
    return jsonify({'status': 'ok'})

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
    loadType = data['isAnnual']  
    rateStructureType = data['rateStructure']

    Input_Data = InData()
    
    # if foundLoad:
    #     Input_Data.setCSVLoad(data['region'], data['state'])
    # else:

    if loadType:
        annual_load = float(data['annualTotalLoad'])
        Input_Data.setAnnualLoad(annual_load)
    else:
        monthlyLoad = np.array([float(data[f'monthlyLoad{i}']) for i in range(1, 13)])
        Input_Data.setMonthlyLoad(monthlyLoad)

    if rateStructureType == 'Flat Rate':
        flatRate = float(data['flatRate'])
        Input_Data.setFlatRate(flatRate)
    elif rateStructureType == 'Seasonal Rate':
        seasonalRates = np.array([float(data['seasonalRateField1']), float(data['seasonalRateField2'])])
        Input_Data.setSeasonalRate(seasonalRates)
    elif rateStructureType == 'Monthly Rate':
        monthlyRates = np.array([float(data[f'monthlyRate{i}']) for i in range(1, 13)])
        Input_Data.setMonthlyRate(monthlyRates)
    elif rateStructureType == 'Tiered Rate':
        tieredPrices = np.array([float(data['lowTierPrice']), float(data['mediumTierPrice']), float(data['highTierPrice'])])
        tieredLoads = np.array([float(data['lowTierMaxLoad']), float(data['mediumTierMaxLoad']), float(data['highTierMaxLoad'])])
        Input_Data.setTieredRate(tieredPrices, tieredLoads)
    elif rateStructureType == 'Seasonal Tiered Rate':
        summerTieredPrices = np.array([float(data['summerLowTierPrice']), float(data['summerMediumTierPrice']), float(data['summerHighTierPrice'])])
        winterTieredPrices = np.array([float(data['winterLowTierPrice']), float(data['winterMediumTierPrice']), float(data['winterHighTierPrice'])])
        seasonalTieredPrices = np.array([summerTieredPrices, winterTieredPrices])
        summerTieredLoads = np.array([float(data['summerLowTierMaxLoad']), float(data['summerMediumTierMaxLoad']), float(data['summerHighTierMaxLoad'])])
        winterTieredLoads = np.array([float(data['winterLowTierMaxLoad']), float(data['winterMediumTierMaxLoad']), float(data['winterHighTierMaxLoad'])])
        seasonalTieredLoads = np.array([summerTieredLoads, winterTieredLoads])
        Input_Data.setSeasonalTieredRate(seasonalTieredPrices, seasonalTieredLoads)
    elif rateStructureType == 'Monthly Tiered Rate':
        monthlyTieredPrices = [float(data[f'{month}LowPrice']) for month in ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']]
        monthlyTieredLoads = [float(data[f'{month}LowMaxLoad']) for month in ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']]
        Input_Data.setMonthlyTieredRate(np.array(monthlyTieredPrices), np.array(monthlyTieredLoads))
    elif rateStructureType == 'Time of Use':
        onPrice = np.array([float(data['summerOnPeakPrice']), float(data['winterOnPeakPrice'])])
        midPrice = np.array([float(data['summerMidPeakPrice']), float(data['winterMidPeakPrice'])])
        offPrice = np.array([float(data['summerOffPeakPrice']), float(data['winterOffPeakPrice'])])
        onHours = np.array([tou_hour_array_conversion(data['summerOnPeakHours']), tou_hour_array_conversion(data['winterOnPeakHours'])])
        midHours = np.array([tou_hour_array_conversion(data['summerMidPeakHours']), tou_hour_array_conversion(data['winterMidPeakHours'])])
        Input_Data.setTimeOfUseRate(onPrice, midPrice, offPrice, onHours, midHours)
    
    Input_Data.completeInitialization()

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
        Input_Data.setGrid(0)
        Input_Data.setNEM(0)

    Input_Data.projectLifetime(data['n'])
    Input_Data.setLPSP_max_rate(data['LPSP_max_rate'])
    Input_Data.setRE_min_rate(data['RE_min_rate'])
    Input_Data.sete_ir_rate(data['e_ir_rate'])
    Input_Data.setn_ir_rate(data['n_ir_rate'])
    Input_Data.setir(data['ir'])
    Input_Data.setREIncentivesRate(data['re_incentives_rate'])

    return Input_Data

@app.route("/submit/general", methods=['POST'])
def submit_general():
    try:
        data = request.json
        if data is None:
            return jsonify({'error': 'No JSON data provided'}), 400
        Input_Data = process_general_data(data)
        if Input_Data is None:
            return jsonify({'error': 'Invalid data format or missing required fields'}), 400
        answer = pso.run(Input_Data)
        if answer is None:
            return jsonify({'error': 'Failed to generate answer'}), 500
        return jsonify(answer)
    
    except KeyError as ke:
        app.logger.error(f'KeyError in submit_general: {ke}')
        return jsonify({'error': f'Missing key in input data: {ke}'}), 400
    except TypeError as te:
        app.logger.error(f'TypeError in submit_general: {te}')
        return jsonify({'error': f'Incorrect type of input data: {te}'}), 400
    except ValueError as ve:
        app.logger.error(f'ValueError in submit_general: {ve}')
        return jsonify({'error': 'Invalid input data format'}), 400
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

# comment out on local development
if __name__ == "__main__":
    app.run(debug=True)
