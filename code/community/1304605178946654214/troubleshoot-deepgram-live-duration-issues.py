import os
import websockets
import asyncio
import json

async def transcribe_live_audio():
    api_key = os.getenv('DEEPGRAM_API_KEY')
    audio_source = os.getenv('AUDIO_SOURCE')

    uri = f"wss://api.deepgram.com/v1/listen"
    headers = {"Authorization": f"Token {api_key}"}

    async with websockets.connect(uri, extra_headers=headers) as websocket:
        # Send audio data
        await websocket.send(audio_source)

        while True:
            message = await websocket.recv()
            response = json.loads(message)
            if 'channel' in response:
                print(response['channel']['alternatives'][0]['transcript'])

# Run the transcription
asyncio.run(transcribe_live_audio())