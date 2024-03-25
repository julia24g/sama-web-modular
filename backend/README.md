## Request Limits

Request limits are limited by the external APIs we use.

NREL limits: 1000 requests / hour
Nominatum OpenStreetMap Geocoder limits: 1 request / second

# 🛠️ Development 

Default values used by the code can be found in input_data.py.

## Requirements

- Install necessary python requirements: `pip install -r requirements.txt`

## To start the flask app:

Run this command: `flask run`

This will start up the local flask server on localhost:5000.

### Debug mode

Debug mode will restart server automatically each time there is a new change made.

To enter debug mode, go to the line of code with `app.run()` and update it to `app.run(debug=True)`. 

Start your flask server with the following command instead: `python3 app.py`