import os
import requests

# Retrieve environment variables
DEEPGRAM_API_KEY = os.getenv('DEEPGRAM_API_KEY')
PROJECT_ID = os.getenv('PROJECT_ID')

# Endpoint for Deepgram transcription
url = 'https://api.deepgram.com/v1/listen'

def transcribe_audio(audio_url):
    headers = {
        'Authorization': f'Token {DEEPGRAM_API_KEY}',
        'Content-Type': 'application/json'
    }
    data = {
        'url': audio_url,
        'project': PROJECT_ID
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        print('Transcription:', response.json())
    else:
        print('Error:', response.status_code, response.text)

# Example audio URL
audio_url = 'https://example.com/audiofile.mp3'

transcribe_audio(audio_url)