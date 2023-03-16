from flask import Flask, request, json, send_file
# from flask_cors import CORS #comment this on deployment
import sqlite3
from base64 import b64encode
import os
import requests
from google.cloud import secretmanager # For accessing API keys on Google Secret Manager
import numpy as np

from api.swarm import Swarm

def create_app():

    app = Flask(__name__)
    # CORS(app) #comment this on deployment

    """
    Connect to Google Secret Manager and retrieve PVWatts API Key.
        Locally: User must be authenticated with GCP and have access to the sama-web-app project. Contact project owner to gain access.
        Deployed on GAE: GAE has access to the same service account as the Secret Manager.
    """
    def get_api_key_from_secret_manager(key):
        # Create the Secret Manager client.
        client = secretmanager.SecretManagerServiceClient()

        # Access the secret version.
        project_id = "sama-web-app"
        secret_id = key
        version = 1
        name = client.secret_version_path(project_id, secret_id, version)

        response = client.access_secret_version(name=name)
        return response.payload.data.decode('UTF-8') # Return decoded payload


    """
    Make GET request to PVWatts v8 API to retrieve location-specific data.
        Return: 
    """
    def retrieve_PVWatts_data(longitude, latitude):
        # get PVWatts API key from Secret manager
        try:
            pvwatts_api_key = get_api_key_from_secret_manager("PVWATTS_API_KEY")
        except Exception as e:
            print("Error retrieving PVWatts API key from Google Secret Manager")
            print(e)
            raise Exception()
        
        # Make GET request to PVWatts V8
        response = requests.get(
            'https://developer.nrel.gov/api/pvwatts/v8.json',
            params={
                "api_key": pvwatts_api_key,
                "system_capacity": 1, # random for now
                "module_type": 0, 
                "losses": 0, 
                "array_type": 1, 
                "tilt": float(latitude)-10,
                "azimuth": 0,
                "lat": latitude,
                "lon": longitude,
                "timeframe": "hourly"
            }
        )

        # Handle errors from PVWatts API
        if response.status_code != 200:
            print("Error retrieving data from PVWatts API")
            print(response.status_code, response.reason)
            raise Exception()

        # return json values for plane of irradiance (poa), ambient temperature (tamb), windspeed (wdsp)
        return response.json()["outputs"].get("poa"), response.json()["outputs"].get("tamb"), response.json()["outputs"].get("wspd")

    """
    Convert zipcode to longitude/latitude using OpenCage Data API
    """
    def retrieve_lng_lat(zipcode):
        # get API key from Secret Manager
        try:
            open_cage_data_api_key = get_api_key_from_secret_manager("OPENCAGE_DATA_API_KEY")
        except Exception as e:
            print("Error retrieving Open Cage Data API key from Google Secret Manager")
            print(e)
            raise Exception()
                
        # Make GET request to Open Cage geocoder API
        response = requests.get(
            "https://api.opencagedata.com/geocode/v1/json",
            params={
                "q": f'{zipcode},USA',
                "language": 'en',
                "key": open_cage_data_api_key
            }
        )

        # Handle errors from PVWatts API
        if response.status_code != 200:
            print("Error retrieving data from Open Cage Data API")
            print(response.status_code, response.reason)
            raise Exception()

        # return values for longitude and latitude
        return response.json()["results"][0]["geometry"]["lng"], response.json()["results"][0]["geometry"]["lat"]


    """
    This endpoint calls the PSO module to perform calculations
        Return: Response object
    """
    @app.route("/submit", methods=['GET'])
    def submit():
        print("Processing request...")

        zipcode = request.args.get("zipcode")
        state = request.args.get("state")
        region = request.args.get("region")

        if zipcode==None or state==None or region==None:
            print("Request must include zipcode, state, and region")
            response = app.response_class(
                response=json.dumps("Request must include zipcode and state/region"),
                status=400,
                mimetype='application/json'
            )
            return response
        
        # Retrieve long/lat from zipcode
        try:
            longitude, latitude = retrieve_lng_lat(zipcode)
        except Exception as e:
            print("Error retrieving data from Open Cage")
            response = app.response_class(
                response=json.dumps("Error retrieving data from PVWatts"),
                status=500,
                mimetype='application/json'
            )
            return response
        

        """
        TODO: parallelize these two try-except blocks because they are independent
        """
        # Retrieve PVWatts data
        try:
            hourly_plane_of_irradiance, hourly_ambient_temperature, hourly_windspeed = retrieve_PVWatts_data(longitude, latitude)
        except Exception as e:
            print("Error retrieving data from PVWatts")
            response = app.response_class(
                response=json.dumps("Error retrieving data from PVWatts"),
                status=500,
                mimetype='application/json'
            )
            return response

        # Read residential load data from local files
        try:
            region = region.replace(" ", ".")
            path = f'api/residential_load_data/{state}_{region}.csv'
            residential_load_data = np.genfromtxt(path, delimiter=",")
        except Exception as e:
            print(e)
            response = app.response_class(
                response=json.dumps(str(e)),
                status=500,
                mimetype='application/json'
            )
            return response        

        # verify data is the correct size
        if len(hourly_plane_of_irradiance) != 8760 or len(hourly_ambient_temperature) != 8760 or len(hourly_windspeed) != 8760:
            print("Malformed PVWatts data")
            response = app.response_class(
                response=json.dumps(str(e)),
                status=500,
                mimetype='application/json'
            )
            return response

        try:
            # Perform PSO calculations
            swarm = Swarm(residential_load_data, hourly_plane_of_irradiance, hourly_ambient_temperature, hourly_windspeed)
            swarm.optimize()
            result, file_bytes = swarm.get_final_result(plot_curve=True)
        except Exception as e:
            print(e)
            response = app.response_class(
                response=json.dumps(str(e)),
                status=500,
                mimetype='application/json'
            )
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

        # Store location in database
        con = sqlite3.connect("Locations.db")
        cur = con.cursor()
        cur.execute("CREATE TABLE IF NOT EXISTS Locations (Longitude double, Latitude double)") # Create table if it doesnt exist yet
        cur.execute(f"INSERT INTO Locations VALUES ({longitude}, {latitude})") # Insert new row with long/lat into db

        # Commit to db and close it
        con.commit()
        con.close()

        # Return json response
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
    app.run(debug=True)
else:
    gunicorn_app = create_app() # Production uses gunicorn as the web server
