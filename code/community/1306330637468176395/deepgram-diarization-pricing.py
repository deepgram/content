import os
import requests

api_key = os.getenv("DEEPGRAM_API_KEY")
audio_url = os.getenv("AUDIO_URL")

headers = {
    "Authorization": f"Token {api_key}",
    "Content-Type": "application/json"
}

payload = {
    "url": audio_url,
    "diarize": True
}

response = requests.post("https://api.deepgram.com/v1/listen", headers=headers, json=payload)

if response.status_code == 200:
    print("Transcription result:", response.json())
else:
    print("Error:", response.status_code, response.text)