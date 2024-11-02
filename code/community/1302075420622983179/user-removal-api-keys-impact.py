import os
import requests

# Set your Deepgram API key in the environment variable
api_key = os.getenv('DEEPGRAM_API_KEY')

# Deepgram API endpoint
url = "https://api.deepgram.com/v1/listen"

# Make the HTTP POST request
response = requests.post(url, headers={"Authorization": f"Bearer {api_key}"})

# Check the status and print the response text
if response.status_code == 200:
    print("Response:", response.json())
else:
    print("Request failed with status:", response.status_code)

# NOTE: Before running, ensure you have set the DEEPGRAM_API_KEY environment variable.