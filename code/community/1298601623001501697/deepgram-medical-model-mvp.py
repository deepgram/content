import os
from deepgram import Deepgram
import asyncio

API_KEY = os.getenv('DEEPGRAM_API_KEY')
MODEL = 'nova-2-medical'

async def transcribe():
    dg_client = Deepgram(API_KEY)

    audio_url = '<YOUR_AUDIO_URL_HERE>'  # Replace this with your audio file URL
    source = {"url": audio_url}

    response = await dg_client.transcription.prerecorded(  # Change this method according to the real-time requirement
        source,
        {
            "model": MODEL,
            "language": "en-US"
        }
    )

    print("Transcript:", response['results']['channels'][0]['alternatives'][0]['transcript'])

if __name__ == '__main__':
    asyncio.run(transcribe())