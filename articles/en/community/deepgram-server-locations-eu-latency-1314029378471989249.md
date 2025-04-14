# Deepgram Server Locations and Latency Considerations for EU Users

Deepgram's robust suite of APIs supports transcriptions, live transcription, and text-to-speech services, which are accessed globally. For users or servers based in Europe leveraging live streaming APIs, understanding server locations is crucial to optimizing performance, specifically concerning latency.

## Deepgram Data Center Locations

Deepgram operates data centers in multiple regions to provide optimal performance:

- **US East**
- **US West**

Our exact physical data center locations are generally not disclosed, but this information can help users estimate potential latency based on their geographic location and connectivity.

### Impact on European Users

For those in Europe or with servers located in Europe, it is important to note that accessing Deepgram services will involve transatlantic network traffic. While actual latency will depend on several factors like internet service provider performance, network conditions, and the specific routing path taken, using data centers located in the US may introduce higher latency compared to a hypothetical European data center.

### Optimizing API Usage

To optimize the experience despite these geographic distances, consider the following best practices:

- **Network Optimization:** Work with your network provider to ensure the fastest path to US data centers.
- **API Request Configuration:** Optimize your API requests for efficiency; using smaller audio chunks for live streaming can reduce processing time.

1. **Connection Management**: Implement proper connection pooling and reuse WebSocket connections when possible.

2. **Monitoring**: Use Deepgram's monitoring tools to track latency and performance metrics.

### References

- [Deepgram API Documentation](https://developers.deepgram.com)
- [Deepgram Status Page](https://status.deepgram.com)