# Using Trial Account Key for Real-Time Twilio Call Transcriptions

Many developers aim to integrate real-time transcription of Twilio calls using Deepgram's live transcription API. This guide provides clarity on using your Deepgram trial account API key for real-time transcription, particularly in a setup involving Twilio.

## Overview

Deepgram's live transcription services can be integrated with Twilio for real-time audio transcription. This integration is possible using a trial account key, which is typically granted upon initial signup with Deepgram. A trial account key offers the same functionality as paid account keys, allowing users to make API calls across Deepgram's services, including live transcription.

### Real-Time Transcription API
- **Endpoint**: `wss://api.deepgram.com/v1/listen`
- **Docs**: [Getting Started with Live Streaming Audio](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio)

## Implementation Steps

### Setup

1. **Obtain a Trial API Key**: Sign up for Deepgram and receive your trial API key. This key is necessary for authenticating API requests.

2. **Integrate with Twilio**: Ensure your Twilio setup can stream audio data in real-time. Configuration might include setting up Twilio's programmable voice to direct call audio streams to your server.

3. **Connect to Deepgram API**: Use the WebSocket endpoint for real-time data streaming. Connect your Twilio audio streams to this endpoint to start receiving live transcriptions.

### Example Code Snippets

#### Node.js
```javascript
const WebSocket = require('ws');

const socket = new WebSocket('wss://api.deepgram.com/v1/listen', {
  headers: {
    Authorization: `Token YOUR_TRIAL_API_KEY`,
  },
});

socket.on('open', () => {
  console.log('Connection established.');
  // Stream Twilio audio here
});

socket.on('message', (data) => {
  console.log('Received data:', data);
});
```

#### .NET (C#)
```csharp
using WebSocketSharp;

var ws = new WebSocket("wss://api.deepgram.com/v1/listen");
ws.SetCredentials("YOUR_TRIAL_API_KEY", "", true);

ws.OnMessage += (sender, e) => 
{
    Console.WriteLine("Received data: " + e.Data);
};

ws.Connect();
// Stream Twilio audio here
```

### Trial Limitations

- **Quota**: Confirm the free credits or usage limitations associated with your trial account.
- **Features**: While the trial account provides access to most features, certain enterprise-level features might not be available.

## Conclusion

Using a trial account key, you can successfully transcribe real-time Twilio call audio using Deepgram's live transcription API. Ensure that your setup correctly streams audio data to Deepgram and make adjustments as needed to handle authentication and data processing efficiently.

## References

- [Deepgram Live Transcription API](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio)