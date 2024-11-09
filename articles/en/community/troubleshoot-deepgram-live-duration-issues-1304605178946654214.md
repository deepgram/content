# Troubleshooting Deepgram Live Transcription Audio Duration Issues

If you're experiencing an issue where the audio duration returns as 0 when using Deepgram's live transcription API, there are a few common causes and solutions to consider.

## Understanding the Issue

When you receive an audio duration of 0 with a 101 response code, it indicates a successful WebSocket connection to Deepgram's API. However, this also means that no audio was received through the connection. 

The issue typically arises from the streaming audio that isn't correctly being sent through the WebSocket. It could be due to configuration errors in setting up the audio stream or possible network issues affecting the transmission.

Additionally, requests transitioning from **Pending** to **Unknown** to **Lost** states ([Deepgram documentation](https://developers.deepgram.com/docs/using-logs-usage#understanding--console-usage-log-states)) suggest that metadata retrieval failed, and no cost is incurred in such cases. For streaming, this often indicates an improperly initialized WebSocket connection.

## Troubleshooting Steps

### Application Logs

1. **Check Logs:** Examine application logs to verify if the intended number of bytes are being sent out.

2. **Local Source Streaming Test:** Stream audio to another local service to inspect the differences between sent and received audio. Adjust the setup based on differences observed.

### WebSocket Initialization

- **WebSocket Configuration:** Double-check the configuration to ensure appropriate setup.
- **Network Issues:** Investigate and fix any potential network issues that might be interfering.

### Monitoring and Debugging

- **Status Transitions:** Pay attention to request status transitions in your Deepgram console. This provides insights if they change from “Pending” to “Unknown” to “Lost”. Such transitions often signify WebSocket payload issues.

- **Reference Examples:** Borrow and adapt setup examples from Deepgram's example solutions to verify stability across different implementations.

```python
# Python Example
import websocket
# WebSocket setup and audio streaming code goes here

```

```javascript
// JavaScript Example
const ws = new WebSocket('wss://api.deepgram.com/v1/listen');
// WebSocket setup and audio streaming code goes here

```

```dotnet
// .NET Example
var client = new WebSocket('wss://api.deepgram.com/v1/listen');
// WebSocket setup and audio streaming code goes here

```

```rust
// Rust Example
use WebSocket;
WebSocket setup and audio streaming code goes here

```

```go
// Go Example
var conn WebSocket
// WebSocket setup and audio streaming code goes here

```

---

Finding and fixing these issues often resolves the problem and ensures stable communication with the Deepgram API.

## Conclusion

Properly configuring and testing your audio streaming setup is crucial to making the best use of Deepgram’s live transcription. Regularly consult logs, test stream different scenarios, and adhere to consistent debugging protocols. For deeper issues, revisit the foundational setup of the WebSocket and audio source to ensure clarity and correct operation.

---

### References

- [Deepgram Documentation on WebSocket API](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio)
- [Deepgram Logs and Usage Guide](https://developers.deepgram.com/docs/using-logs-usage#understanding--console-usage-log-states)