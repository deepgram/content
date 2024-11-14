import os
import asyncio
import websockets
import dotenv

dotenv.load_dotenv()

async def transcribe():
    api_key = os.getenv("DEEPGRAM_API_KEY")
    uri = "wss://api.deepgram.com/v1/listen?model=multi"

    async with websockets.connect(uri,
                                  extra_headers={"Authorization": f"Token {api_key}"}) as websocket:
        # Add your audio stream reading logic here
        # For demonstration, we're just sending a test message
        await websocket.send("Your audio stream chunk here")

        response = await websocket.recv()
        print(f"Received: {response}")

asyncio.get_event_loop().run_until_complete(transcribe())

# Make sure to have DEEPGRAM_API_KEY set in your .env file.
# Replace "Your audio stream chunk here" with actual audio data.