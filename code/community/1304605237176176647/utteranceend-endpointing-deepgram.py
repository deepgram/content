# Python example for Deepgram transcription using WebSockets

import os
import asyncio
import websockets

async def transcribe_audio():
    api_key = os.getenv("DEEPGRAM_API_KEY")
    uri = "wss://api.deepgram.com/v1/listen?endpointing=800&utterance_end_ms=2000"

    async with websockets.connect(uri, extra_headers={"Authorization": f"Token {api_key}"}) as websocket:
        # Example audio data (this would be your real audio stream)
        dummy_audio_data = b'\x01\x02\x03\x04\x05'
        await websocket.send(dummy_audio_data)

        while True:
            response = await websocket.recv()
            if "speech_final": True in response:
                print("Speech has ended based on speech_final flag.")
            elif "UtteranceEnd" in response:
                print("Utterance has ended with no preceding speech_final.")

asyncio.run(transcribe_audio())
# Reference: https://websockets.readthedocs.io/en/stable/intro.html