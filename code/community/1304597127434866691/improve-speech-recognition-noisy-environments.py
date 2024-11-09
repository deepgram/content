import os
from deepgram import Deepgram
import asyncio

async def main():
    # Load environment variables
    api_key = os.getenv("DEEPGRAM_API_KEY")
    audio_url = os.getenv("AUDIO_URL")

    # Create Deepgram SDK instance
    dg_client = Deepgram(api_key)

    # Set the options for transcription with noise filtering
    options = {"punctuate": True, "noise_reduction": True}

    try:
        # Transcribe the audio from the URL
        response = await dg_client.transcription.prerecorded({"url": audio_url}, options)
        
        # Print the transcription
        print(response['results']['channels'][0]['alternatives'][0]['transcript'])
    except Exception as e:
        print(f"An error occurred: {e}")

# Run the transcription task
asyncio.run(main())