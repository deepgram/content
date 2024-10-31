import os
import asyncio
import websockets

async def connect_stt():
    url = "wss://api.deepgram.com/v1/listen"
    api_key = os.environ['DEEPGRAM_API_KEY']
    headers = {"Authorization": f"Token {api_key}"}

    async with websockets.connect(url, extra_headers=headers) as websocket:
        await websocket.send("{\"content-type\": \"audio/wav\", \"interim_results\": true}")
        while True:
            response = await websocket.recv()
            print(f"STT Received: {response}")

async def connect_tts():
    url = "wss://api.deepgram.com/v1/speak"
    api_key = os.environ['DEEPGRAM_API_KEY']
    headers = {"Authorization": f"Token {api_key}"}

    async with websockets.connect(url, extra_headers=headers) as websocket:
        tts_text = "Hello, this is a test message for TTS."
        await websocket.send(tts_text)
        response = await websocket.recv()
        print(f"TTS Received: {response}")

async def main():
    await asyncio.gather(
        connect_stt(),
        connect_tts()
    )

if __name__ == '__main__':
    asyncio.run(main())