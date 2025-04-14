# Prevent Deepgram Agent from Self-Interruption

## Understanding and Mitigating Deepgram Agent Self-Interruption

When using Deepgram's Voice Agent API, you might encounter situations where the agent responds to its own voice output, creating an unintended feedback loop. This happens when the agent's speech is captured by the microphone and sent back to the API as user input.

## Solutions to Prevent Self-Interruption

Based on the official Deepgram documentation, here are the recommended approaches to prevent the agent from triggering itself:

1. **Enable Echo Cancellation**:
   - Most browsers provide built-in echo cancellation that can help prevent the microphone from picking up the agent's speech.
   - Implement echo cancellation in your `getUserMedia` audio constraints:

   ```javascript
   navigator.mediaDevices
       .getUserMedia({
         audio: {
           sampleRate: 16000,
           channelCount: 1,
           echoCancellation: true,  // Helps suppress the agent's voice being re-captured
           noiseSuppression: false, // Optional, depends on use case
         },
       })
       .then(stream => {
         // Use the audio stream
       })
       .catch(error => {
         console.error("Error accessing microphone:", error);
       });
   ```

2. **Programmatically Mute the Microphone**:
   - Temporarily disable microphone input while the agent is speaking.
   - Re-enable the microphone when the agent has finished speaking.
   - This can be implemented by tracking the agent's speech state through the WebSocket events.

3. **Use a Voice Activity Detector (VAD)**:
   - Implement a local VAD to determine when to send audio through the WebSocket.
   - Only send audio when the VAD detects human speech, preventing the agent's voice from being processed.
   - Disengage/engage sending audio based on the VAD's detection.

4. **Use a Headset**:
   - A physical solution is to use a headset, which naturally separates the input (microphone) from the output (speakers/headphones).
   - This reduces the chance of audio feedback loops.

## Implementation Example

Here's a simple example of implementing microphone muting during agent speech:

```javascript
// Track when agent is speaking
let isAgentSpeaking = false;
let micStream = null;

// When connecting to Voice Agent API
webSocket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  
  // When agent starts speaking
  if (message.type === 'AgentStartedSpeaking') {
    isAgentSpeaking = true;
    // Mute microphone
    if (micStream) {
      micStream.getAudioTracks().forEach(track => track.enabled = false);
    }
  }
  
  // When agent stops speaking
  if (message.type === 'AgentAudioDone') {
    isAgentSpeaking = false;
    // Unmute microphone
    if (micStream) {
      micStream.getAudioTracks().forEach(track => track.enabled = true);
    }
  }
});

// Get microphone stream
navigator.mediaDevices.getUserMedia({
  audio: {
    echoCancellation: true,
    sampleRate: 16000,
    channelCount: 1
  }
}).then(stream => {
  micStream = stream;
  // Process the stream...
});
```

## Further Resources

For more details on implementing these solutions, refer to the official Deepgram documentation:

- [Voice Agent Adaptive Echo Cancellation](https://developers.deepgram.com/docs/voice-agent-echo-cancellation)
- [Voice Agent Audio & Playback](https://developers.deepgram.com/docs/voice-agent-audio-playback)

If you continue to experience issues, reach out to the Deepgram community for assistance: [Deepgram Discord](https://discord.gg/deepgram)

### References
- Learn more about Deepgram Agent API: [Deepgram Documentation](https://developers.deepgram.com/docs/voice-agent)
- External Tool Documentation: [MermaidJS](https://mermaid-js.github.io/mermaid/#/)
- Community Support: [Deepgram Community Discord](https://discord.gg/deepgram)
