# Base Image
FROM python:3.9-slim-buster

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Set the environment variables
ENV PORT=5000

# Expose the port that the app is running on
EXPOSE ${PORT}

# Start the application
CMD gunicorn --bind localhost:5000 app:gunicorn_app
