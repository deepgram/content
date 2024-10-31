import os
from deepgram import Deepgram

# Retrieve the Deepgram API key from environment variables
API_KEY = os.getenv('DEEPGRAM_API_KEY')

# Instantiate the Deepgram client
dg_client = Deepgram(api_key=API_KEY)

# Placeholder to represent where the key would be deleted
# Typically, logic to delete/discard key goes here

def delete_key(key_id):
    # Logic that should be executed after the connection is established
    print(f'Deleting key with ID: {key_id}')
    # Note: This must be replaced with actual Deepgram API key deletion code

if __name__ == "__main__":
    key_id = os.getenv('DEEPGRAM_KEY_ID')
    
    # Assume the key was used prior in logic
    delete_key(key_id)

# This script assumes you would replace the `delete_key` function placeholder
# with actual deletion implementation supported by your key management scheme.