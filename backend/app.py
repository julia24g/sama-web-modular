from flask import Flask, render_template, jsonify, request
import requests
from dotenv import load_dotenv
import os
from flask_cors import CORS
import sama_python.Input_Data as Input_Data
import sama_python.pso as pso
import numpy as np

load_dotenv()
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/getUtilityRates", methods=['POST'])
def get_utility_rates():
    data = request.json
    zipcode = data['zipcode']
    api_key = os.getenv('NREL_API_KEY')
    
    # Retrieve coordinates from the provided zipcode
    url = f'https://nominatim.openstreetmap.org/search?q={zipcode}&format=json&limit=1'
    response = requests.get(url)
    if not response.ok:
        return jsonify({'error': 'Failed to retrieve coordinates'})
    
    coordinates = response.json()
    if not coordinates:
        return jsonify({'error': 'No coordinates found for the given zipcode'})

    latitude = coordinates[0]['lat']
    longitude = coordinates[0]['lon']
    
    # Fetch utility rates using the obtained coordinates
    utility_url = f'https://developer.nrel.gov/api/utility_rates/v3.json?api_key={api_key}&lat={latitude}&lon={longitude}'
    utility_response = requests.get(utility_url)
    if not utility_response.ok:
        return jsonify({'error': 'Failed to fetch utility rates'})

    utility_data = utility_response.json()
    response = jsonify(utility_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    return response

@app.route('/submit/general', methods=['POST'])
def submit_general():
    data = request.json
    zipcode = data['zipcode']
    loadType = data['isAnnual']
    rateStructureType = data['rateStructure']

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
    else:
        return jsonify({'error': 'Not implemented yet'})
    
    pso.run()

    return jsonify({'message': 'General calculator processing complete'})

@app.route('/submit/advanced', methods=['GET'])
def submit_advanced():
    data = request.args  # or request.json if you're sending data as JSON
    # # Process the data...
    # return jsonify({'message': 'Advanced calculator processing complete'})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
    print('Starting Flask!')
