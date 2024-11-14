# Import necessary libraries
import os
import requests

# Define the audio file path and API details
AUDIO_FILE_PATH = 'your_audio_file_path.wav'
DEEPGRAM_API_URL = "https://api.deepgram.com/v1/listen"
DEEPGRAM_API_KEY = os.environ.get('DEEPGRAM_API_KEY')

# Ensure the API key is set
if DEEPGRAM_API_KEY is None:
    raise ValueError("The DEEPGRAM_API_KEY environment variable must be set.")

# Read audio file
with open(AUDIO_FILE_PATH, 'rb') as audio_file:
    audio_data = audio_file.read()

# Set headers for the request
headers = {
    'Authorization': f'Token {DEEPGRAM_API_KEY}',
    'Content-Type': 'audio/wav'
}

# Make post request to Deepgram API
response = requests.post(DEEPGRAM_API_URL, headers=headers, data=audio_data)

# Check if request was successful
if response.status_code == 200:
    # Do something with the response, for example log the transcription
    result = response.json()
    print("Transcription results:", result)
else:
    # Handle the error
    print(f"Error: {response.status_code} - {response.text}")