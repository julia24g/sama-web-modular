# Requirements
Install necessary python requirements while terminal path is in the `backend` folder: `pip install -r requirements.txt`

# APIs
This application uses the following external APIs:
- NREL (https://developer.nrel.gov/docs/solar/pvwatts/v8/, https://developer.nrel.gov/docs/electricity/utility-rates-v3/)
- Zipcode Stack (https://zipcodestack.com/documentation/#endpoints-GETv1-search)
- NASA Power (https://power.larc.nasa.gov/docs/services/api/temporal/climatology/)

You will need to create your own API keys for the NREL and Zipcode Stack APIs and add them to a .env file within your backend with the variables `NREL_API_KEY` and `ZIPCODE_STACK_API_KEY`.

## Request Limits
Request limits are limited by the external APIs we use.
- NREL limits: 1000 requests / hour
- Zipcode Stack limits: 10,000 requests / month
- NASA Power limits: 1000 requests / hour