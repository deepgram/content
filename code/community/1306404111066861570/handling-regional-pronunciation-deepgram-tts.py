import os
import requests

# Set your Deepgram API key as an environment variable before running the script
API_KEY = os.getenv('DEEPGRAM_API_KEY')

# Define the URL for the TTS service
url = 'https://api.deepgram.com/v1/speak'

# Function to convert text to speech
# Modify names creatively to alter pronunciation
text_payload = {
    "text": "Hello, this is a test pronunciation of the name SpellingAlteration."
}

headers = {
    'Authorization': f'Token {API_KEY}',
    'Content-Type': 'application/json'
}

response = requests.post(url, json=text_payload, headers=headers)

if response.status_code == 200:
    print('Request successful!')
    print('Audio response URL:', response.json().get('url'))
else:
    print('Request failed with status code:', response.status_code)