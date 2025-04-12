# Setting Up a Proxy Server for Deepgram API with WebSocket

When building applications that forward microphone data to the Deepgram listen API, you can set up a proxy server to facilitate the process. This setup can help protect your API key and simplify data handling between a client-side application and the Deepgram service. Here's a guide to help you set it up effectively.

## Proxy Server Setup

**Objective**: Forward WebM-encoded audio blobs from a client (e.g., a browser extension) through a proxy server to the Deepgram listen API via WebSockets.

### Requirements

- **Express.js**: Employed as a lightweight server to host the proxy.
- **WebSocket**: Used to facilitate real-time, bidirectional communication.
- **The Deepgram SDK**: Ensures seamless interaction with the Deepgram API.

### Steps to Implement

1. **Client Setup**
   
   The client-side collects audio data using the Web Media API. This data is then sent over a WebSocket connection to the local proxy server.
   ```javascript
   navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
       const mediaRecorder = new MediaRecorder(stream);
       const socket = new WebSocket('ws://localhost:3001');
       
       socket.onopen = () => {
           mediaRecorder.addEventListener('dataavailable', (event) => socket.send(event.data));
           mediaRecorder.start(250);
       };

       socket.onmessage = (message) => console.log(JSON.parse(message.data));
   });
   ```
2. **Proxy Server**

   The server acts as a middle layer, receiving data from the client and sending it to Deepgram for transcription.
   
   ```javascript
   const express = require('express');
   const app = express();
   const WebSocket = require('ws');
   const { createClient, LiveTranscriptionEvents } = require('@deepgram/sdk');

   const deepgram = createClient('YOUR_API_KEY');
   
   const wss = new WebSocket.Server({ port: 3001 });

   app.use(express.static('public'));

   wss.on('connection', (ws) => {
       const deepgramLive = deepgram.listen.live({ interim_results: true });

       deepgramLive.on(LiveTranscriptionEvents.Open, () => console.log('Deepgram connection opened'));
       
       ws.onmessage = (event) => {
           deepgramLive.send(event.data);
       };

       deepgramLive.on(LiveTranscriptionEvents.Transcript, (data) => {
           ws.send(data);
       });
   });

   app.listen(3000);
   ```

## Troubleshooting

### No Response from Deepgram

- Ensure the data format being sent matches Deepgram's requirements.
- Verify that your API key is correct and has sufficient permissions.
- Check if the WebSocket connections are open and maintained correctly both at the client and server ends.

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram

## Conclusion

By setting up a proxy server using Express.js and WebSocket, you can effectively route audio data from a client to the Deepgram listen API. This setup not only helps in real-time data processing but also contributes to protecting your API key from direct exposure in client-side code.

### References

- [Deepgram SDK on GitHub](https://github.com/deepgram)
- [Deepgram Developers - Token-Based Authentication](https://developers.deepgram.com/docs/token-based-authentication)