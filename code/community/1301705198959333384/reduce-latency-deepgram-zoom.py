import os
from deepgram import Deepgram
import asyncio

async def main():
    # Set your Deepgram API key using an environment variable
    deepgram_api_key = os.getenv('DEEPGRAM_API_KEY')

    if not deepgram_api_key:
        raise ValueError("DEEPGRAM_API_KEY environment variable not set")

    # Initialize Deepgram SDK
    dg_client = Deepgram(deepgram_api_key)

    # Define the audio source (e.g., from a Zoom call)
    audio_source = 'your-zoom-websocket-url'

    # Start listening with additional options for lower latency
    try:
        # Connect to the audio stream
        response = await dg_client.transcription.live({
            'url': audio_source,
            'punctuate': True,
            'interim_results': True
        })

        # Process received transcriptions
        async for transcription in response:
            print(f'Transcription: {transcription}')

    except Exception as e:
        print(f'Error: {e}')

# Run the main function
asyncio.run(main())

# Refer to the Deepgram Python SDK documentation for more details on customization and handling results.