# To start the flask app
`gunicorn --bind localhost:5000 backend.app:gunicorn_app --timeout 180`]

# Build docker image
`docker build --tag <image_name> .`

# List all docker images
`docker images`

# Run Docker image
`docker run <image_name>` 