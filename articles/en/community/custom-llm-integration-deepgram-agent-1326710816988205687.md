# Setting Up Custom LLM Integration with Deepgram Voice Agent

To integrate a custom language model (LLM) with Deepgram Voice Agent, it is important to follow the correct response format expected by the agent. Integration with default providers such as OpenAI or Anthropic typically works out of the box, but custom models require a specific configuration and message structure to function correctly.

## Configuring the Custom LLM

When setting up your custom LLM to work with Deepgram Voice Agent, ensure that your server is configured to process incoming requests and respond in the expected JSON format. Here is a basic outline of the necessary steps:

1. **Set Up the Server:** Your server should be capable of handling POST requests and respond with JSON.
2. **Expose Public Endpoint:** Use a tool like [NGROK](https://ngrok.com/) to expose your local development server to the internet. This tool will provide a publicly accessible URL to which Deepgram can send requests.
3. **Configure Deepgram Agent:** Set the Deepgram Voice Agent configuration to use your custom LLM endpoint.

### Example Configuration for Deepgram

Here is an example configuration for integrating a custom LLM with Deepgram:

```json
{
  "think": {
    "provider": {
      "type": "custom",
      "url": "https://your-server-url/v1/chat/completions"
    }
  }
}
```

Ensure that your server can handle requests sent to the endpoint specified in the URL.

### Server Response Format

Deepgram expects a specific response format for agent integration. Responses should be structured as follows:

```json
{
  "id": "chatcmpl-11111111-2222-3333-4444-555555555555",
  "object": "chat.completion",
  "created": 1687319693,
  "model": "custom-langgraph-agent",
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0
  },
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "Response content here",
      "type": "ConversationText"
    },
    "finish_reason": "stop",
    "index": 0
  }]
}
```

Ensure that the JSON object is correctly formatted and all necessary fields are included.

### Troubleshooting Tips

- Double-check your server logs to ensure that it is receiving the POST requests and correctly processing them.
- Verify that NGROK is providing a stable connection and that the URL is correctly configured in your agent settings.
- Test your endpoint independently (e.g., using Postman) to ensure it is responsive and correctly structured.

## Conclusion

By carefully configuring both your server and the Deepgram agent settings, you can successfully integrate a custom LLM with Deepgram Voice Agent. Make sure to adhere to the expected response structure and troubleshoot any networking issues that may arise, especially those related to the use of NGROK or other tunneling services.

For further assistance, consult the Deepgram documentation here: [Deepgram Voice Agent Documentation](https://developers.deepgram.com/docs/voice-agent-llm-models). If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative or visit the [Deepgram Community](https://discord.gg/deepgram) for assistance.

## References
- [Deepgram Voice Agent LLM Models Documentation](https://developers.deepgram.com/docs/voice-agent-llm-models)
- [Deepgram Voice Agent Azure Integration Example](https://github.com/deepgram-devs/voice-agent-azure-open-ai-services/blob/1ad0eee7d99cff521da0de9abaf247ad24a4e1a6/client.py#L41)
- [NGROK Documentation](https://ngrok.com/docs)