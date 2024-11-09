import os
import requests

# Set the API details
api_key = os.getenv('DEEPGRAM_API_KEY')
audio_url = 'https://your-audio-file-url.com/audio.wav'

# Define the endpoint and headers
url = 'https://api.deepgram.com/v1/listen'
headers = {
    'Authorization': f'Token {api_key}',
    'Content-Type': 'application/json'
}

# Set query parameters
params = {
    'diarize': 'true',
    'punctuate': 'true'
}

# Make the request to the Deepgram API
response = requests.post(url, headers=headers, params=params, data={"url": audio_url})

# Print the response
print(response.json())