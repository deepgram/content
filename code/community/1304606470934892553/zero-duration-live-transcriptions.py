import os
from deepgram import Deepgram
import asyncio

async def main():
    api_key = os.getenv('DEEPGRAM_API_KEY')
    deepgram = Deepgram(api_key)

    options = {
        'punctuate': True,
        'encoding': 'mulaw',
        'channels': 2,
        'sample_rate': 8000,
        'multichannel': True  # Ensure multichannel is true for multiple channels
    }

    try:
        response = await deepgram.transcribe_live(options)
        print("Live transcription started successfully:", response)
    except Exception as e:
        print("Error starting live transcription:", e)

# For more about multichannel setup, refer to: https://developers.deepgram.com/docs/multichannel

asyncio.run(main())