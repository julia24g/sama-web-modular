from flask import Flask, request, json
from flask_cors import CORS #comment this on deployment
import sqlite3

from api.swarm import Swarm

app = Flask(__name__)
CORS(app) #comment this on deployment


# This endpoint calls the PSO module to perform calculations
@app.route("/submit", methods=['GET'])
def submit():
    # mySum = test.test(request.args["longitude"], request.args["latitude"])
    swarm = Swarm()
    swarm.optimize()
    swarm.get_final_result(print_result=True, plot_curve=False)

    return {
      'resultStatus': 'SUCCESS',
      'result': 'BOGUS TEMP VALUE'
    }


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
