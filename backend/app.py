from flask import Flask, request, json, send_file
# from flask_cors import CORS #comment this on deployment
import sqlite3
from base64 import b64encode
import os
import requests

from backend.api.swarm import Swarm

def create_app():

    app = Flask(__name__)
    # CORS(app) #comment this on deployment

    def retrieve_PVWatts_data(longitude, latitude):
        # get PVWatts API key from environment variables set in App Engine's app.yaml
        pvwatts_api_key = os.environ.get('PVWATTS_API_KEY')

        # Make GET request to PVWatts V8
        response = requests.get(
            'https://developer.nrel.gov/api/pvwatts/v8.json',
            params={
                "api_key": pvwatts_api_key,
                "system_capacity": 1, # random for now
                "module_type": 1, # random for now
                "losses": 1, # random for now
                "array_type": 1, # random for now
                "tilt": 1, # random for now
                "azimuth": 1, # random for now
                "lat": latitude,
                "lon": longitude,
                "timeframe": "hourly"
            }
        )
        return response.json()["outputs"].get("poa"), response.json()["outputs"].get("tamb"), response.json()["outputs"].get("wspd")


    # This endpoint calls the PSO module to perform calculations
    @app.route("/submit", methods=['GET'])
    def submit():
        print("Processing request...")

        longitude = request.args.get("longitude")
        latitude = request.args.get("latitude")

        if longitude==None or latitude==None:
            return "Request must include longitude and latitude", 400 

        # Retrieve PVWatts data
        hourly_plane_of_irradiance, hourly_ambient_temperature, hourly_windspeed = retrieve_PVWatts_data(longitude, latitude)

        # Perform PSO calculations
        swarm = Swarm(hourly_plane_of_irradiance, hourly_ambient_temperature, hourly_windspeed)
        swarm.optimize()
        result, file_bytes = swarm.get_final_result(print_result=True, plot_curve=True)

        # encode bytes to base64 for json
        base64_bytes = b64encode(file_bytes)
        base64_string = base64_bytes.decode('utf-8')
        
        # build response
        data = {
            "image": base64_string,
            "text": result
        }
        response = app.response_class(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )
        return response
        # return send_file(file_bytes, mimetype='image/png')


    @app.route("/locations", methods=["POST", "GET"])
    def locations():
        # Connect to database
        con = sqlite3.connect("Locations.db")
        cur = con.cursor()
        cur.execute("CREATE TABLE IF NOT EXISTS Locations (Longitude double, Latitude double)")

        if request.method == 'POST':
            cur.execute(f"INSERT INTO Locations VALUES ({request.json['longitude']}, {request.json['latitude']})")
            data = request.json

        if request.method == 'GET':
            res = cur.execute("SELECT * FROM Locations")
            data = res.fetchall()
        
        con.commit()
        con.close()
        return {
            'resultStatus': 'SUCCESS',
            'result': data
        }
    
    return app


if __name__ == "__main__":
    app = create_app()
    app.run()
else:
    gunicorn_app = create_app()
