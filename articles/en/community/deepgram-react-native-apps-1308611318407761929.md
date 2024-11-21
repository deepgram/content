# Using Deepgram for React Native Apps

To integrate Deepgram's live transcription services into a React Native application, follow these guidelines to ensure that the audio data is sent in an appropriate format to their WebSocket API endpoint.

### Setup for React Native

First, you need to establish a WebSocket connection with Deepgram. Use the following guidelines to set up WebSocket and handle audio streaming effectively in your React Native application.

```javascript
var socket = React.useRef(new WebSocket('wss://api.deepgram.com/v1/listen', ['token', MY_TOKEN])).current;
```

Ensure the WebSocket is opened correctly, and manage its lifecycle by reacting to various events such as `onopen`, `onclose`, `onerror`, and `onmessage`.

### Audio Stream Configuration

When using a module like `LiveAudioStream`, confirm that audio options (
`sampleRate`, `channelCount`, etc.) match the audio configurations expected by Deepgram's API.

### Handling Audio Streams

You would typically send audio data as binary. Make sure your implementation correctly encodes the audio data to a format Deepgram can parse.

Example:
```javascript
LiveAudioStream.on('data', (data) => {
    const chunkData = Buffer.from(data, 'base64');
    socket.send(chunkData);
});
```

### Common Issues

If you encounter metadata responses with a `created` timestamp but 0 channels or data that can't be parsed, double-check:

- Audio encoding formats
- Sample rate alignment
- Proper WebSocket initialization

### Conclusion

By following these steps, you can better ensure that your React Native application communicates effectively with Deepgram's services. For further assistance or code examples, dive into our [GitHub Discussions](https://github.com/orgs/deepgram/discussions) or join us on [Discord](https://discord.gg/deepgram) to collaborate with the community.

### References
- [Deepgram WebSocket API Documentation](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio)
- [React Native Audio Libraries](https://npmjs.com/package/react-native-audio)