import os
import requests

# Load your Deepgram API key from environment variables
api_key = os.getenv('DEEPGRAM_API_KEY')

# Prepare your audio file
audio_path = "path/to/your/audio/file.mp3"
with open(audio_path, 'rb') as audio_file:
    audio_data = audio_file.read()

# Set the Deepgram API endpoint
url = "https://api.deepgram.com/v1/listen"

# Set headers for authentication and content type
headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'audio/mpeg'
}

# Make the POST request to Deepgram API
response = requests.post(url, headers=headers, data=audio_data)

# Print response from API
if response.ok:
    print("Transcription:", response.json().get('results', {}).get('channels', [{}])[0].get('alternatives', [{}])[0].get('transcript', ""))
else:
    print("Error:", response.json())

# Note: Replace "path/to/your/audio/file.mp3" with the actual path to your MP3 file. This code snippet uploads the MP3 file as raw binary data to Deepgram's API for transcription.