import os
from deepgram import Deepgram

# Set your Deepgram API key in environment variable
api_key = os.getenv('DEEPGRAM_API_KEY')

dg_client = Deepgram(api_key)

source = {"url": "https://storage.googleapis.com/deepgram-demos/voicemail.mp3"}

response = dg_client.transcription.prerecorded(source, {
  'model': 'general',
  'language': 'en-US'
})

print(response)