# Troubleshooting Deepgram WebSocket API Disconnections

When using Deepgram's WebSocket API for live audio streaming and transcription, you may encounter connection issues. This guide will help you understand, diagnose, and resolve common WebSocket disconnections based on Deepgram's official documentation.

## Understanding WebSocket Disconnection Errors

Deepgram's WebSocket API may close connections with specific error codes and messages:

| Code | Payload | Description |
|------|---------|-------------|
| `1008` | `DATA-0000` | The payload cannot be decoded as audio. The data is either not audio or uses an unsupported codec. |
| `1011` | `NET-0000` | Deepgram hasn't sent a Text frame to the client within the timeout window. |
| `1011` | `NET-0001` | Deepgram hasn't received a Binary or Text frame from the client within the 10-second timeout window. |

## Common Causes and Solutions for WebSocket Disconnections

### For 1011 NET-0001 (No Audio Data Received)

This is the most common disconnection error, triggered when Deepgram doesn't receive any audio data within approximately 10 seconds.

#### Solutions:

1. **Send Audio Promptly**: 
   - Begin sending audio data immediately after establishing the WebSocket connection
   - Don't wait longer than 10 seconds before sending your first audio packet

2. **Implement KeepAlive Messages**:
   - Send KeepAlive messages when there's no audio to transmit:
   ```json
   { "type": "KeepAlive" }
   ```
   - Note: KeepAlive alone won't prevent disconnection - you must send some audio data first

3. **Avoid Empty Audio Packets**:
   - Check audio packet size before sending:
   ```javascript
   // JavaScript example
   if (audioData.length > 0) {
     websocket.send(audioData);
   }
   ```

4. **Handle Connection Closing Properly**:
   - To intentionally close a connection, send:
   ```json
   { "type": "CloseStream" }
   ```
   - Don't send empty binary data (`Uint8Array(0)` or `b''`) as this is deprecated

### For 1008 DATA-0000 (Invalid Audio Data)

This error occurs when Deepgram can't decode the audio data you're sending.

#### Solutions:

1. **Verify Audio Format**:
   - Ensure you're sending raw audio data (not containerized files like MP3 or WAV)
   - Specify the correct encoding and sample rate in your connection parameters:
   ```
   wss://api.deepgram.com/v1/listen?encoding=linear16&sample_rate=16000
   ```

2. **Validate Audio Data**:
   - Test your audio capture process by saving the same data to a file to verify it's valid
   - Check that audio buffers aren't corrupted during transmission

## Implementation Example: Maintaining a Robust Connection

```javascript
// Initialize WebSocket with proper parameters
const ws = new WebSocket('wss://api.deepgram.com/v1/listen?encoding=linear16&sample_rate=16000');
ws.binaryType = 'arraybuffer';

// Set up authentication
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'Authorization',
    token: 'YOUR_DEEPGRAM_API_KEY'
  }));
  
  // Start sending audio immediately
  startAudioCapture();
  
  // Set up keepalive interval
  setInterval(() => {
    if (noAudioBeingSent) {
      ws.send(JSON.stringify({ type: 'KeepAlive' }));
    }
  }, 5000); // Send every 5 seconds when silent
};

// Handle audio packets
function sendAudioChunk(audioData) {
  // Prevent sending empty packets
  if (audioData && audioData.length > 0) {
    ws.send(audioData);
  }
}

// Handle disconnection errors
ws.onclose = (event) => {
  console.log(`WebSocket closed with code ${event.code}, reason: ${event.reason}`);
  
  if (event.code === 1011 && event.reason === 'NET-0001') {
    console.log('Connection timed out due to no audio data received within timeout window');
    // Implement reconnection logic here
  }
};
```

## Additional Resources

- [Deepgram WebSocket Errors Documentation](https://developers.deepgram.com/docs/troubleshooting-websocket-data-and-net-errors-when-live-streaming-audio)
- [Using KeepAlive Messages](https://developers.deepgram.com/docs/keep-alive)
- [Live Streaming Starter Kit](https://github.com/deepgram/streaming-test-suite)

If issues persist, join our [Discord community](https://discord.gg/deepgram) for additional assistance.
