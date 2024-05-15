# Directions for Use
Please see the respective README files in `backend` and `frontend` for initial requirements that need to be downloaded, API keys that need to be created and added to a .env file, and more.

To make transitioning between local and production development easier, different environment variables for the local backend URL (http://127.0.0.1:5000) and the production backend URL (https://sama.eng.uwo.ca/api) have been set in the variable `process.env.REACT_APP_API_URL`. In order to switch between these two variables in the different environments, see the instructions below.

## Local Development

### To run the application locally
- Open 2 terminals and change their paths so that one is in the frontend folder (`cd frontend`), and one is in the backend folder (`cd backend`)
- In the frontend terminal, run this command: `npm run start:dev` 
- In the backend terminal, run this command: `flask run`

### To build the application locally
Although changes to the local frontend show up automatically while saving changes and running `npm run start:dev`, it's a good idea to build the React application frequently.
- In the frontend terminal, run this command: `npm run build:dev` 

### To debug the application locally
When I've wanted to debug the application, I open the `backend` folder in a seperate VSCode window. I open the `app.py` file, and in the top right-hand corner of VSCode, I select Debug Python File. It will ask you to create a Flask Debugger, and then you're free to add breakpoints with the UI open.

## Production Development

The web tool is currently already running indefinitely at https://sama.eng.uwo.ca.

### To reflect new changes in the production application 
Everytime you push changes to your Github repo, there are a few steps you need to do in order to see those changes online.
- ssh into the Western server and login
- After logging in, change your terminal path to be inside the Github repository (`cd sama-web-modular`)
- Pull Github repo changes: `git pull`
- Build the production frontend React application
    - Change your terminal path to `sama-web-modular/frontend/deploy`
    - Delete the `build` folder within deploy: `rm -r build` (I'm not sure why but I get an error when I don't do this)
    - Change your terminal path to `sama-web-modular/frontend`
    - Run the following command: `npm run build:prod`
- Reload the nginx server: `sudo systemctl reload nginx`
- Restart the gunicorn.service server: `sudo systemctl restart gunicorn.service`

Two important things to note is that once you complete all these steps and want to check whether the changes are reflected online, you must disconnect from the WesternU-MFA and, generally, you need to clear the cache and cookies of the site. I'm not sure why, but when connected to the WesternU-MFA, there seems to some firewall restrictions that prevent you from seeing the web tool properly.

After completing these steps, the changes should now be visible online.

**If you are a Western student continuing this work, please visit [this Google Drive](https://drive.google.com/drive/folders/1eKAezRE9Kz2p3puAeC-Q2_5FBXIUnrP-?usp=sharing) and request access to see more information about the paper and the servers, or email me at jgroza@uwo.ca for any questions or help - I'm more than happy to help!**

# Next Steps
- Setting up the DB on the server. Since we don't want to use any external services (eg. AWS), setting up a DB will involve creating DB scripts to build and update the DB, connecting it to the DB server, and managing the local and production DB environments. We want to collect the result data (the parameters the user sees at results) as well as zipcode or latitude/longitude.
- Once data is being collected, we want to develop some public analytics on the results we're getting. One idea was a map of the US that puts a pin on a location whenever a successful result is generated, and the color of the pin (greed, red, or yellow) identifies whether grid defection is economical, near economical, or not economical. 
- Beautifying the UI and improving form user experience.
- Improving responsiveness of the site for mobile usage.