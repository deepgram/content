import os
import requests

# Configure your Deepgram API Key via an environment variable
API_KEY = os.getenv('DEEPGRAM_API_KEY')

# Set the Deepgram endpoint for pre-recorded transcription
url = "https://api.deepgram.com/v1/listen"

def transcribe_audio(audio_url):
    headers = {
        'Authorization': f'Token {API_KEY}',
    }
    data = {
        'url': audio_url,
    }
    params = {
        'punctuate': True,
        'language': 'en',
        # Add other desired parameters here
    }

    response = requests.post(url, headers=headers, params=params, json=data)
    response.raise_for_status()
    print("Final transcription:", response.json().get('results', {}).get('channels', [{}])[0].get('alternatives', [{}])[0].get('transcript', ''))

# Example audio source for transcription
transcribe_audio('https://example.com/audio.wav')