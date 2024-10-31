import os
import requests

# Load the Deepgram API key from an environment variable
DEEPGRAM_API_KEY = os.getenv('DEEPGRAM_API_KEY')

url = "https://api.deepgram.com/v1/speak"

text_to_speak = "Hello, world!"

headers = {
    "Authorization": f"Bearer {DEEPGRAM_API_KEY}",
    "Content-Type": "application/json"
}

json_data = {
    "text": text_to_speak,
    "voice": "en-US"
}

response = requests.post(url, headers=headers, json=json_data)

if response.status_code == 200:
    print("Text-to-Speech executed successfully")
else:
    print("Failed to execute Text-to-Speech")