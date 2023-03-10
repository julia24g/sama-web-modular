# Development

## Requirements

- Install 'Allow CORS: Access-Control-Allow-origin' chrome extension and toggle on to allow CORS for development purposes.
- If testing the backend locally as well, replace 'https://backend-dot-sama-web-app.uc.r.appspot.com/submit' with 'http://localhost:5000/submit' in App.js

## Starting the Local Server: `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Deployment

## Prepare for Deployment

1. Ensure the axios requests points to the correct backend service ('https://backend-dot-sama-web-app.uc.r.appspot.com/submit')
2. The /deploy directory should contain your app.yaml which specifies the config for App Engine
3. Have the Google Cloud CLI (gcloud) installed on your local device: https://cloud.google.com/sdk/docs/install

## Building for Deployment: `npm run build`

Builds the app for production to the `deploy/build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Deploying to App Engine

1. Go to the deploy folder: `cd deploy`
2. Deploy your build to App Engine: `gcloud app deploy`

