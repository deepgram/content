# Configuring Voice Agent Language for Deepgram

When configuring the language settings for a Deepgram Voice Agent, it is crucial to ensure the language parameter is placed correctly to avoid configuration errors. This guide outlines the correct method for setting the language within your agent's configuration.

Configuring a Deepgram Voice Agent requires careful setup, especially when specifying language. A typical error encountered, such as "Text message received from client did not match any of the formats we expect," indicates a misconfiguration related to deprecated settings or parameters in the Voice Agent.

### Correct Configuration for Voice Agent Language

To avoid this common error, ensure you place the `language` parameter at the top level of the agent configuration object, rather than under `listen`. This ensures that the language setting is applied uniformly across all components of the Voice Agent, including listening, thinking, and speaking modules.

Here is an example of a correctly configured agent:

```json
{
  "type": "SettingsConfiguration",
  "audio": {
    "input": {
      "encoding": "linear16",
      "sample_rate": 8000
    },
    "output": {
      "encoding": "mulaw",
      "sample_rate": 8000,
      "container": "none"
    }
  },
  "agent": {
    "language": "hi",  // ✅ Move language here
    "listen": {
      "model": "nova-2"
    },
    "think": {
      "provider": {
        "type": "anthropic"
      },
      "model": "claude-3-haiku-20240307",
      "instructions": "<your-prompt>"
    },
    "speak": {
      "provider": "eleven_labs",
      "voice_id": "cgSgspJ2msm6clMCkdW9"
    }
  }
}
```

### Conclusion

Avoiding the deprecated use of `language` within `listen` resolves the configuration error, ensuring that your Deepgram Voice Agent operates correctly with the specified language settings. By placing the `language` parameter at the top level, you maintain compatibility with current API expectations and improve overall functionality.

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram

### References
- [Deepgram Agent API Documentation](https://developers.deepgram.com/docs/voice-agent)
- Deepgram Community: [Discord](https://discord.gg/deepgram)