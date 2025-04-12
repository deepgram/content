# Troubleshooting Voice Agent HTTPS API Call with Custom Ports

When using the Deepgram Voice Agent to interface with external APIs, particularly custom endpoints, it can sometimes be challenging to ensure seamless communication, especially when custom ports are involved. 

## Custom Port Issue in HTTPS Calls

Deepgram's Voice Agent may experience issues if attempting to connect to an HTTPS endpoint that uses a non-standard port. Standard HTTPS ports (typically port 443) tend to work more reliably, as evidenced by instances where changing to a default port solved connectivity issues. 

### Problem Overview

In integrating a Voice Agent with an external API, you may encounter a scenario where requests are dispatched by the agent but do not reach the intended external API endpoint. This can lead to responses not being spoken by the agent, even though the request was successfully initiated.

#### Example Function Definition

Here's a typical setup in a scenario where you're attempting to use a custom port:

```plaintext
FUNCTION_DEFINITIONS = [
    {
        "name": "get_weather",
        "description": "Call the given API URL with city name as a json object.",
        "url": "https://[API_FQDN]:22020/teamsadapter/functions",
        "method": "post",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {"type": "string"},
            }
        }
    },
]
```

In this code, you define that the endpoint should be called to get weather details, accepting a city name as a parameter. Here, a custom port (22020) is specified.

### Troubleshooting Steps

1. **Attempt Connection on Default Port:**
   - If your endpoint is self-hosted, consider exposing it on a default HTTPS port (443) and retry the connection. Using standard ports can circumvent issues related to network restrictions or platform-specific configurations.

2. **Use NGROK for Testing Locally-Hosted Services:**
   - If your service is running locally, using tools like [NGROK](https://ngrok.com/) can provide a publicly accessible URL that doesn't include a port. This can help verify if the port is the root cause by circumventing it.

### Conclusion

If you find that only default ports facilitate successful communications, ensure that your deployment environment aligns with such port configurations. Testing with public tunneling services like NGROK can aid in local testing and debugging.

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram

### References:
- [NGROK Documentation](https://ngrok.com/docs)
- Original community discussion and interaction notes from a relevant Deepgram thread.