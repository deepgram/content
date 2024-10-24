import os
from dotenv import load_dotenv
import asyncio
import websockets

# Load environment variables from .env file
load_dotenv()

async def main():
    # Fetch the Deepgram API key from environment variables
    api_key = os.getenv('DEEPGRAM_API_KEY')
    url = 'wss://api.deepgram.com/v1/listen'

    # Connect to the WebSocket
    async with websockets.connect(
        url,
        extra_headers={
            'Authorization': f'Token {api_key}'
        }
    ) as websocket:
        print("Connected to Deepgram API")
        # Here you could send/receive data with websocket
        await websocket.send("Your data or message here")

# Start the async event loop to run the main function
asyncio.run(main())

# Note: Ensure the environment variable DEEPGRAM_API_KEY is set correctly.