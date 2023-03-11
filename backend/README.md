# Development 

## Requirements

- Install necessary python requirements: `pip install -r requirements.txt`
- Install development requirements: `pip install -r requirements-dev.txt`
- Ensure you have 'Accessor' permissions to the sama-web-project's Google Secret Manager so that you can access the API Keys
-- Reach out to a project admin to be granted permission if needed
- Have the Google Cloud CLI (gcloud) installed on your local device: https://cloud.google.com/sdk/docs/install
- Authenticate with GCP on your local device: `gcloud auth application-default login`
-- If you receive an authentication error from the app, you may need to redo this step because your credentials timed out

## To start the flask app: `flask run`

This will start up the local flask server on localhost:5000.

### Debug mode

Debug mode will restart server automatically each time there is a new change made.

To enter debug mode, go to the line of code with `app.run()` and update it to `app.run(debug=True)`. 

Start your flask server with the following command instead: `python3 app.py`

# Deployment

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

## Deploying to App Engine

1. Ensure you are in the 'backend' folder
2. Deploy your build to App Engine: `gcloud app deploy`

Note: Built container images are stored in the app-engine folder in Container Registry.\
Once deployment is complete, App Engine no longer needs the container images.\
To avoid reaching your storage quota, you can safely delete any images you don't need. 

There is a rule currently set up that deletes artifacts that are 1+ days old.

Reference: https://cloud.google.com/appengine/docs/standard/testing-and-deploying-your-app#managing_build_images
