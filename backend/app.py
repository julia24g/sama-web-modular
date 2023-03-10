from flask import Flask, request, json, send_file
# from flask_cors import CORS #comment this on deployment
import sqlite3
from base64 import b64encode
import os
import requests
from google.cloud import secretmanager # For accessing API keys on Google Secret Manager

from api.swarm import Swarm

def create_app():

    app = Flask(__name__)
    # CORS(app) #comment this on deployment

    """
    Connect to Google Secret Manager and retrieve PVWatts API Key.
        Locally: User must be authenticated with GCP and have access to the sama-web-app project. Contact project owner to gain access.
        Deployed on GAE: GAE has access to the same service account as the Secret Manager.
    """
    def get_pvwatts_api_key():
        # Create the Secret Manager client.
        client = secretmanager.SecretManagerServiceClient()

        # Access the secret version.
        project_id = "sama-web-app"
        secret_id = "PVWATTS_API_KEY"
        version = 1
        name = client.secret_version_path(project_id, secret_id, version)

        response = client.access_secret_version(name=name)
        return response.payload.data.decode('UTF-8') # Return decoded payload


    """
    Make GET request to PVWatts v8 API to retrieve location-specific data.
    """
    def retrieve_PVWatts_data(longitude, latitude):
        # get PVWatts API key from environment variables set in App Engine's app.yaml
        try:
            pvwatts_api_key = get_pvwatts_api_key()
        except Exception as e:
            print("Error retrieving PVWatts API key from Google Secret Manager")
            print(e)
            response = requests.Response()
            response.reason="Error retrieving PVWatts API key from Google Secret Manager"
            response.status_code=500
            return response
        
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

        # Handle errors from PVWatts API
        if response.status_code != 200:
            print("Error retrieving data from PVWatts API")
            print(response.status_code, response.reason)
            response = requests.Response()
            response.reason="Error retrieving data from PVWatts API"
            response.status_code=500
            return response

        # return json values for plane of irradiance (poa), ambient temperature (tamb), windspeed (wdsp)
        return response.json()["outputs"].get("poa"), response.json()["outputs"].get("tamb"), response.json()["outputs"].get("wspd")


    """
    This endpoint calls the PSO module to perform calculations
    """
    @app.route("/submit", methods=['GET'])
    def submit():
        print("Processing request...")

        longitude = request.args.get("longitude")
        latitude = request.args.get("latitude")

        if longitude==None or latitude==None:
            print("Request must include longitude and latitude")
            response = requests.Response()
            response.reason="Request must include longitude and latitude"
            response.status_code=400
            return response

        # Retrieve PVWatts data
        hourly_plane_of_irradiance, hourly_ambient_temperature, hourly_windspeed = retrieve_PVWatts_data(longitude, latitude)

        # verify data is the correct size
        if len(hourly_plane_of_irradiance) != 8760 or len(hourly_ambient_temperature) != 8760 or len(hourly_windspeed) != 8760:
            print("Malformed PVWatts data")
            response = requests.Response()
            response.reason="Malformed PVWatts data"
            response.status_code=500
            return response

        try:
            # Perform PSO calculations
            swarm = Swarm(hourly_plane_of_irradiance, hourly_ambient_temperature, hourly_windspeed)
            swarm.optimize()
            result, file_bytes = swarm.get_final_result(print_result=True, plot_curve=True)
        except Exception as e:
            print(e)
            response = requests.Response()
            response.reason=str(e)
            response.status_code=500
            return response

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
