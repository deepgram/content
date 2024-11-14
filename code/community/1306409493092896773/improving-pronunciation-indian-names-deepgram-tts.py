import os
import requests
import json

# Set the API key from environment variables
api_key = os.getenv('DEEPGRAM_API_KEY')

# Set the API endpoint
api_endpoint = 'https://api.deepgram.com/v1/speak'

# Construct text with phonetic spelling to improve pronunciation
text = "Prasanna (p-r-ah-s-a-n-n-a), Mangesh (m-uh-ng-ey-sh), Anil (ah-n-ee-l) are example names."

# JSON payload
payload = {
    'text': text,
    'voice': 'en-US'  # Assuming the use of a US voice model
}

# Send POST request to Deepgram TTS API
response = requests.post(
    api_endpoint,
    headers={
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    },
    data=json.dumps(payload)
)

# Check if the response is successful
if response.status_code == 200:
    print("Audio generated successfully.")
else:
    print(f"Failed to generate audio: {response.status_code}")