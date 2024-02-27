from flask import Flask, render_template, jsonify, request
import requests
from dotenv import load_dotenv
import os
from flask_cors import CORS

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

@app.route('/submit/general', methods=['GET'])
def submit_general():
    # Process the general calculator request
    data = request.args  # or request.json if you're sending data as JSON
    # Process the data...
    return jsonify({'message': 'General calculator processing complete'})

@app.route('/submit/advanced', methods=['GET'])
def submit_advanced():
    # Process the advanced calculator request
    data = request.args  # or request.json if you're sending data as JSON
    # Process the data...
    return jsonify({'message': 'Advanced calculator processing complete'})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
    print('Starting Flask!')
