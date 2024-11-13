import os
import requests

# Load environment variables
api_key = os.getenv('DEEPGRAM_API_KEY')
audio_url = os.getenv('AUDIO_URL')

# API endpoint
url = "https://api.deepgram.com/v1/listen"

# Headers
headers = {
    "Authorization": f"Token {api_key}",
    "Content-Type": "application/json"
}

# Data payload
payload = {
    "url": audio_url,
    "diarize": True
}

# Make the API request
response = requests.post(url, headers=headers, json=payload)

# Print the response
print(response.text)