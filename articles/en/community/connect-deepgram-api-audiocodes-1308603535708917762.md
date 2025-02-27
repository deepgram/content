# Connecting Deepgram API to AudioCodes for Speech Services

When integrating the Deepgram API with AudioCodes to create AI-powered phone agents or services, you may encounter configuration challenges. This guide provides necessary steps to ensure a successful setup and avoid common errors such as TTS error 403.

## Setting Up AudioCodes with Deepgram

AudioCodes LiveHub allows you to integrate speech services like Deepgram's Text-to-Speech (TTS) and Speech-to-Text (STT). Both services should be configured within AudioCodes under `Speech Services` as `Generic provider (using AC API)`. Here are the necessary URLs for each service:

- **TTS:** `https://integrations.deepgram.com/audiocodes/tts`
- **STT:** `wss://integrations.deepgram.com/audiocodes/stt`

### Steps to Configure

1. **Access AudioCodes LiveHub** and navigate to the `Speech Services` section.
2. **Add Deepgram TTS and STT** as separate services using the above-mentioned URLs.
3. **Ensure the Correct Service Type** is selected, which is `Generic provider (using AC API)`.

## Handling 403 Errors

A common error faced during setup is a 403 error, indicating authorization issues. This can be resolved by ensuring that your API key has the necessary permissions to access Deepgram's services.

### Verify API Key Permissions

To verify your API key's permissions for the TTS service, perform the following test:

```bash
curl -X POST \
--url 'https://api.deepgram.com/v1/speak?model=aura-asteria-en' \
-H "Authorization: Token $DEEPGRAM_API_KEY" \
-H "content-type: application/json" \
-d '{"text": "Hey there!"}' > test.mp3
```

In this command, replace `$DEEPGRAM_API_KEY` with your actual API key. If successful, the output should be a playable mp3 file containing the spoken text.

## Conclusion

By properly configuring AudioCodes with the correct API endpoints and ensuring your API key permissions, Deepgram's STT and TTS services should function seamlessly, enabling enhanced speech services for your applications. For further assistance, feel free to reach out to our community on [Discord](https://discord.gg/deepgram) or [GitHub Discussions](https://github.com/orgs/deepgram/discussions).

## References
- AudioCodes Speech Services Configuration
- [Deepgram's TTS API Documentation](https://developers.deepgram.com/docs/tts-rest)
- [Deepgram's Speech-to-Text API Documentation](https://developers.deepgram.com/docs/getting-started-with-pre-recorded-audio)
- [Discord Community](https://discord.gg/deepgram)
- [GitHub Discussions](https://github.com/orgs/deepgram/discussions)