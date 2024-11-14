# Python code to check for job status using Deepgram API
# Requires installation of `deepgram-sdk` via pip
# To run, replace placeholders with real values

import os
from deepgram import Deepgram

async def check_job_status():
    api_key = os.getenv('DEEPGRAM_API_KEY')
    job_id = 'your-job-id'

    # Initialize Deepgram SDK
    dg_client = Deepgram(api_key)

    try:
        # Fetch job status
        response = await dg_client.transcription.get(job_id)
        print('Job status:', response['metadata']['status'])
        # Handle job status accordingly
    except Exception as e:
        print('Error:', e)

if __name__ == '__main__':
    import asyncio
    asyncio.run(check_job_status())