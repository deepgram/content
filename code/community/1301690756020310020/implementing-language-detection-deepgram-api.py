import os
import requests

# Set your Deepgram API key
DEEPGRAM_API_KEY = os.getenv('DEEPGRAM_API_KEY')

# Endpoint and headers
url = 'https://api.deepgram.com/v1/listen'
headers = {
    'Authorization': f'Token {DEEPGRAM_API_KEY}',
    'Content-Type': 'audio/mpeg',
}

params = {
    'detect_language': 'true',
}

# Reading audio file
with open('your_audio_file.mp3', 'rb') as audio_file:
    response = requests.post(url, headers=headers, params=params, data=audio_file)

print(response.json())