# Configuring Deepgram Voice Agent for Portuguese TTS with Cartesia

To configure Deepgram's Voice Agent to speak Portuguese using Cartesia's TTS, you need to adjust the settings properly to ensure the correct language output. This article outlines the necessary configuration steps and addresses potential issues related to setting up the Cartesia TTS provider with a specific language.

## Configuration Steps

To use Cartesia as your TTS provider within Deepgram's Voice Agent, you must set the `speak` model configuration correctly. Here is an example of what your configuration might look like:

```json
{
  "type": "SettingsConfiguration",
  "audio": {
    "input": {
      "encoding": "mulaw",
      "sample_rate": 8000
    },
    "output": {
      "encoding": "mulaw",
      "sample_rate": 8000,
      "container": "none"
    }
  },
  "agent": {
    "listen": {
      "model": "nova-2"
    },
    "think": {
      "provider": {
        "type": "open_ai"
      },
      "model": "gpt-4o-mini"
    },
    "speak": {
      "provider": "cartesia",
      "voice_id": "<your_voice_id>"
    }
  }
}
```

### Adding Language Specification

When using Cartesia, it's important to specify the language to prevent defaulting to English with an accent:

Use the following curl command to test:

```bash
curl -N -X POST "https://api.cartesia.ai/tts/bytes" \
  -H "Cartesia-Version: 2024-06-10" \
  -H "X-API-Key: <your_key>" \
  -H "Content-Type: application/json" \
  -d '{"transcript": "Olá, bem-vindo ao Cartesia Sonic!", "model_id": "sonic", "voice": {"mode":"id", "id": "<voice_id>"}, "output_format":{"container":"wav", "encoding":"pcm_f32le", "sample_rate":44100}, "language": "pt"}' > sonic.wav
```

This command specifies the language parameter explicitly, ensuring the correct Portuguese output.

## Conclusion

As of recent updates, Deepgram might allow specifying language in the Voice Agent Settings Config, simplifying TTS configuration with third-party providers like Cartesia.

Keep your configuration files updated and consult [Cartesia documentation](https://cartesia.ai/docs) for advanced features and settings. If issues persist, reach out to your Deepgram support representative or visit our community on [Discord](https://discord.gg/deepgram) for assistance.

## References

- [Deepgram Voice Agent Documentation](https://developers.deepgram.com/docs/voice-agent)
- [Cartesia TTS Documentation](https://cartesia.ai/docs/tts)
- [Deepgram Community Discord](https://discord.gg/deepgram)