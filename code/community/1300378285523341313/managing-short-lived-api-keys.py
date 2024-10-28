import os
import requests

# Function to request a short-lived API key
def request_api_key():
    response = requests.post(
        "https://api.your-service.com/generate-key",
        headers={"Authorization": f"Bearer {os.getenv('ADMIN_API_KEY')}"}
    )
    return response.json()['api_key']

# Function to delete an API key
def delete_api_key(api_key):
    requests.delete(
        f"https://api.your-service.com/delete-key/{api_key}",
        headers={"Authorization": f"Bearer {os.getenv('ADMIN_API_KEY')}"}
    )

# Request a new API key
api_key = request_api_key()
print(f"API Key: {api_key}")

# Use the API key...

# Delete the API key after use
delete_api_key(api_key)

# Ensure to set ADMIN_API_KEY in your environment variables.