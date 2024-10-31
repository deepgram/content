# Python example for using Deepgram's real-time streaming API with keyword boosting
# Requires the `deepgram-sdk` library

import os
from deepgram import Deepgram
import asyncio

# Deepgram API Key from environment variable
DEEPGRAM_API_KEY = os.getenv('DEEPGRAM_API_KEY')

async def main():
    # Initialize Deepgram client
    dg_client = Deepgram(DEEPGRAM_API_KEY)

    # Options for real-time transcription
    options = {
        "keywords": ["JAY", "HAYWIRE"],
        "punctuate": True
    }

    # Connect to streaming endpoint
    async with dg_client.transcription.live(options) as stream:
        # Listen for the data
        async for data in stream:
            print("Transcript:", data['channel']['alternatives'][0]['transcript'])

# Run the main method
asyncio.run(main())

# Note: This script assumes you've set up a method to stream audio to Deepgram's API