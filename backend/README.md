# 💻 Using the Backend API

This API is publicly available for all users. The following endpoints are available:

`URL = 'https://backend-dot-sama-web-app.uc.r.appspot.com/submit'`

Perfom PSO calculation for a specific location:

`GET /submit?zipcode={your-zipcode}&state={your-state}&region={your-region}`

Note: Users must select from a pre-defined list of regions. See frontend/src/state-regions.json for the list of state to region mappings.

Parameters:
- zipcode (required)
- state (required)
- region (required)
- system_capacity (required)
- pv_cost
- diesel_generator_cost
- battery_cost
- battery_charger_cost

Non-required parameters will use default values if not specificied. Default values used by the code can be found in input_data.py.

## For developers/researchers only
The backend API also stores a database of the locations that users are querying about. The POST endpoint is used to insert a new location. Researchers can also make a GET request to list out all the locations in the database. Locations in the database are not unique.

Get a list of locations that all users are querying about:
`GET /locations`

Insert a location into the database:
`POST /locations?longitude={your-longitude}&latitude={your-latitude}`

## Request Limits

Request limits are limited by the external APIs we use.

NREL limits: 1000 requests / hour
OpenCage Geocoder limits: 2500 requests/ day
Google Secret Manager: 10,000 requests / month are free. Extra will be billed.

Note: Once we migrate to a local server, we can store API keys as environment variables and deprecate the use of Google Secret Manager.

# 🛠️ Development 

## Requirements

- Install necessary python requirements: `pip install -r requirements.txt`
- Install development requirements: `pip install -r requirements-dev.txt`
- Ensure you have 'Accessor' permissions to the sama-web-project's Google Secret Manager so that you can access the API Keys
-- Reach out to a project admin to be granted permission if needed
- Have the Google Cloud CLI (gcloud) installed on your local device: https://cloud.google.com/sdk/docs/install
- Authenticate with GCP on your local device: `gcloud auth application-default login`
-- If you receive an authentication error from the app, you may need to redo this step because your credentials timed out

## To start the flask app:

Run this command: `flask run`

This will start up the local flask server on localhost:5000.

### Debug mode

Debug mode will restart server automatically each time there is a new change made.

To enter debug mode, go to the line of code with `app.run()` and update it to `app.run(debug=True)`. 

Start your flask server with the following command instead: `python3 app.py`

## Migrating to Local Server

1. To migrate the application to a local server, upload all the source code to the server. 
2. Uncomment out code related to the Locations.db database. We can now access and store the locations to the database.
3. Expose two separate ports of the server to listen for external requests. One will be for the backend, one will be for the frontend.
4. Start the servers listening on those ports. 


# 📤 Deployment

## Prepare for deployment

1. Have the Google Cloud CLI (gcloud) installed on your local device: https://cloud.google.com/sdk/docs/install
2. Your app.yaml contains the configs for App Engine. You may change the name of your service url by editing the 'service' field in the app.yaml
3. Ensure debug mode is set to False.
4. Delete ALL old Docker images in the Container Registry: https://console.cloud.google.com/gcr/images/sama-web-app?project=sama-web-app (This step is needed because of the rule to delete old artifacts)

## Deploying Secrets and API Keys
API keys are stored in the Google Secret Manager under the sama-web-app project.\ 
API keys can be edited or created directly via the Google Cloud console if you are granted 'Admin' permissions\
to the sama-web-app project's Secret Manager. 

The sama-web-app service account has admin access to read/write secrets, which is the service account used by both the backend and frontend services.

## Deploying Backend Service to App Engine

1. Ensure you are in the 'backend' folder
2. Deploy your build to App Engine: `gcloud app deploy`
3. Delete all gcloud storage artifacts to avoid charges: `gcloud storage rm --recursive gs://staging.sama-web-app.appspot.com/ ; gcloud storage rm --recursive gs://sama-web-app.appspot.com/ ;  gcloud storage rm --recursive gs://us.artifacts.sama-web-app.appspot.com`

Note: Built container images are stored in the app-engine folder in Container Registry.\
Once deployment is complete, App Engine no longer needs the container images.\
To avoid reaching your storage quota, you can safely delete any images you don't need. 

Reference: https://cloud.google.com/appengine/docs/standard/testing-and-deploying-your-app#managing_build_images

Google automatically creates multi-region US buckets when artifacts are deployed despite GAE being set up with a single region.\
There is no current solution around this issue besides deleting all artifacts after deployment.

Reference: https://stackoverflow.com/questions/62582129/multi-region-cloud-storage-charges

# ⚙️ Troubleshooting on Production Environment

Visit Google Cloud Logging to see all logs: https://console.cloud.google.com/logs/query?project=sama-web-app

Can add filters to search for specify errors:
- Filter for sama-web-app project applications
- Filter for GAE applications
- Filter for log type (INFO, ERROR, etc)
- Filter for time  period

# 💵 Google Cloud Costs

Unfortunately, there is no way to restrict the usage on Google Cloud. \
Once a service reaches a limit, it will start billing the account. \
We can only apply a budget notification - if the costs go over a certain amount, we can get notifed.

We currently use the following services:
- Google App Engine (hosts the backend and frontend microservices)
- Google Cloud Build (to build and deploy to GAE)
- Google Cloud Storage (to store deployment artifacts - can be and SHOULD BE DELETED immediately after deployment)
- Google Secret Manager (to store the API keys)