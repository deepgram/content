# Troubleshooting Deepgram JS SDK WebSocket Connection for TTS

When implementing Text-to-Speech (TTS) using the Deepgram JS SDK, you may encounter issues with establishing a WebSocket connection. This guide provides troubleshooting steps and suggestions to ensure a successful connection.

## Understanding the Connection Issue

A user reported an error when attempting to establish a WebSocket connection using the Deepgram JS SDK with the following URL:

```
wss://api.deepgram.com/v1/speak?model=aura-asteria-en&amp;encoding=linear16&amp;sample_rate=48000
```

Upon inspection, it was found that the model was mistakenly set to `aura-asteria-e` instead of `aura-asteria-en`. This discrepancy suggests that an incorrect model name could cause connection issues.

## Steps to Ensure Correct Usage

1. **Verify Model Name**: Ensure that you are using the correct model name (`aura-asteria-en`) in your WebSocket request.

2. **Check Parameter Formatting**: Double-check the URL encoding values, such as `encoding=linear16` and `sample_rate=48000`, to ensure they match the expected input for the Deepgram API.

3. **Use Deepgram API Endpoints**: Verify your model access through Deepgram's [Get Projects Models endpoint](https://developers.deepgram.com/reference/get-project-models). This can confirm that you have the necessary access to use specific models.

## Example Connection Setup

Here is a sample code snippet that illustrates how to set up the WebSocket connection using the correct parameters:

```javascript
const deepgram = createClient(DEEPGRAM_API_KEY);
const dgConnection = deepgram.speak.live({
  model: "aura-asteria-en",
  encoding: 'linear16',
  sample_rate: 48000,
});
```

## Conclusion

If you continue to experience issues after verifying the parameters, reach out to Deepgram support for further assistance. You can also visit the community forums such as [Discord](https://discord.gg/deepgram) for more support from other users and experts.

## References

- [Deepgram TTS Documentation](https://developers.deepgram.com/docs/tts-rest)
- [Deepgram SDK Repositories](https://github.com/deepgram)
- [Join the Deepgram Community](https://discord.gg/deepgram)