import os
import time
from deepgram import Deepgram

DEEPGRAM_API_KEY = os.getenv('DEEPGRAM_API_KEY')
PROJECT_ID = os.getenv('PROJECT_ID')
FILE_PATH = 'path/to/your/file.wav'  # Update with your actual file path

dg_client = Deepgram(DEEPGRAM_API_KEY)

# Function to transcribe the file and get the request_id
async def transcribe_file():
    response = await dg_client.transcription.prerecorded({
        'url': FILE_PATH,
        'punctuate': True
    })
    return response['metadata']['request_id']

# Function to repeatedly fetch the usage cost
async def get_usage_cost(request_id):
    usage_request = None
    while not usage_request:
        try:
            usage_request = await dg_client.usage.get_usage_request(PROJECT_ID, request_id)
            if 'cost' in usage_request['data'][0]:
                print(f"Cost for request {request_id}: {usage_request['data'][0]['cost']}")
                break
        except Exception as e:
            print(f"Error while fetching usage data: {e}. Retrying after 5 seconds...")
            time.sleep(5)

# Execute transcription and get usage
async def execute():
    request_id = await transcribe_file()
    print(f"Transcription done, request_id: {request_id}")
    await get_usage_cost(request_id)

# To run the execution
# import asyncio
# asyncio.run(execute())