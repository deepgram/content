import os
from deepgram import Deepgram
import asyncio

DEEPGRAM_API_KEY = os.getenv('DEEPGRAM_API_KEY')
FILE_PATH = 'path/to/your/audiofile.wav'

deepgram = Deepgram(DEEPGRAM_API_KEY)

async def transcribe_audio():
    try:
        with open(FILE_PATH, 'rb') as audio:
            source = {'buffer': audio, 'mimetype': 'audio/wav'}
            response = await deepgram.transcription.prerecorded(source)
            print('Transcription:', response)
    except Exception as e:
        print('Error:', e)

asyncio.run(transcribe_audio())
