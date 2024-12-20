# Troubleshooting Docker WebSocket Connection Issues with Deepgram API

When deploying applications that connect to the Deepgram API, you may encounter issues where the connection works perfectly on local machines but fails in a Docker environment. One common error involves a rejected WebSocket connection with an HTTP 400 status code, as shown below:

```
WebSocketException in AbstractAsyncWebSocketClient.start: server rejected WebSocket connection: HTTP 400
AsyncListenWebSocketClient.start failed
2024-10-21 18:27:42.939 | ERROR | pipecat.services.deepgrami.connect:196 - DeepgramSTTService0: Unable to connect to Deepgram client
```

This error typically occurs due to issues in how environment variables are managed within the Docker container, especially those related to authentication and network configurations.

## Common Causes and Solutions

### 1. Missing Environment Variables

The Deepgram SDKs rely on environment variables for setting the API key. If these aren't set correctly within the Docker container, it won't be able to authenticate.

#### Solution:

Ensure your Dockerfile or Docker Compose file correctly sets environment variables. An example for Node.js might look like this:

```dockerfile
ENV DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

For Python, consider using `load_dotenv` to load environment variables from a `.env` file:

```python
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("DEEPGRAM_API_KEY")
```

### 2. Networking and Permissions

Docker container networking configurations might restrict connectivity to external APIs.

#### Solution:

Verify your Docker network settings ensure outbound connections are not blocked. You can add specific network configurations in your Docker Compose file if needed:

```yaml
networks:
  default:
    external:
      name: my-pre-existing-network
```

### 3. Debugging Deployment

Enable debugging to get more detailed error messages, which may help identify the problem more accurately.

For example, in Python, you can enable debug logging by setting up the logger:

```python
import logging

logging.basicConfig(level=logging.DEBUG)
```

## Conclusion

If you face WebSocket connection issues only during a Docker deployment but not locally, the first places to check are environment variable setups and network configurations. Correctly setting up your Docker environment to mirror your local configuration closely leads to smoother deployments.

## References

- [Deepgram Python SDK GitHub](https://github.com/deepgram/deepgram-python-sdk)
- [Deepgram Text-to-Speech Docs](https://developers.deepgram.com/docs/tts-rest)
- [dotenv Documentation](https://pypi.org/project/python-dotenv/)

Use these links as additional resources to help resolve any configuration issues you may encounter with Deepgram's SDKs and API within Docker containers.