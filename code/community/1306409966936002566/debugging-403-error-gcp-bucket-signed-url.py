import os
import requests
from deepgram import Deepgram

# Initialize Deepgram SDK
DEEPGRAM_API_KEY = os.environ['DEEPGRAM_API_KEY']
filepath = './audio-file.wav' # Path to your audio file

dg_client = Deepgram(DEEPGRAM_API_KEY)

# Read in your audio file data
with open(filepath, 'rb') as audio:
    audio_data = audio.read()

# Transcribe audio from file
transcription = dg_client.transcription.sync_prerecorded(
    buffer=audio_data,
    mimetype='audio/wav',
    options={'language': 'en-US'}
)

# Print the transcription
print(transcription['results']['channels'][0]['alternatives'][0]['transcript'])