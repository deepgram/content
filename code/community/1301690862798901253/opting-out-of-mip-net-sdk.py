from deepgram import Deepgram
import os
import asyncio

async def main():
    DEEPGRAM_API_KEY = os.getenv('DEEPGRAM_API_KEY')
    dg_client = Deepgram(DEEPGRAM_API_KEY)

    audio_url = "YOUR_AUDIO_FILE_URL"  # Replace with your audio file URL

    # Setting the custom parameter mip_opt_out to be True
    options = {"mip_opt_out": True}

    response = await dg_client.transcription.prerecorded({'url': audio_url}, **options)
    print('Transcription: ', response)

# Run the main function
asyncio.run(main())