# Python example using requests
# Ensure 'requests' library is installed: `pip install requests`

import os
import requests

# Load environment variables
api_key = os.getenv('DEEPGRAM_API_KEY')
audio_url = os.getenv('AUDIO_FILE_URL')

url = 'https://api.deepgram.com/v1/listen?mip_opt_out=true'

headers = {
    'Authorization': f'Token {api_key}',
    'Content-Type': 'application/json',
}

data = {
    "url": audio_url
}

response = requests.post(url, headers=headers, json=data)

if response.ok:
    print("Transcription:", response.json())
else:
    print("Failed to transcribe audio:", response.status_code)