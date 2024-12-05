# Deepgram Server Locations and Latency Considerations for EU Users

Deepgram's robust suite of APIs supports transcriptions, live transcription, and text-to-speech services, which are accessed globally. For users or servers based in Europe leveraging live streaming APIs, understanding server locations can be crucial to optimizing performance, specifically concerning latency.

### Deepgram Data Center Locations

Currently, Deepgram operates its data centers within the United States, providing coverage from two primary locations:

- **West US Region**
- **East US Region**

Our exact physical data center locations are generally not disclosed, but this information can help users estimate potential latency based on their geographic location and connectivity.

### Impact on European Users

For those in Europe or with servers located in Europe, it is important to note that accessing Deepgram services will involve transatlantic network traffic. While actual latency will depend on several factors like internet service provider performance, network conditions, and the specific routing path taken, using data centers located in the US may introduce higher latency compared to a hypothetical European data center.

### Optimizing API Usage

To optimize the experience despite these geographic distances, consider the following best practices:

- **Network Optimization:** Work with your network provider to ensure the fastest path to US data centers.
- **API Request Configuration:** Optimize your API requests for efficiency; using smaller audio chunks for live streaming can reduce processing time.

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram

### Conclusion

European users can continue to benefit from Deepgram's powerful APIs. While geographic location can affect latency, understanding the current server locations allows you to better manage and optimize these interactions.

For any updates or changes to server locations, Deepgram will provide information through official channels.

### References

- Deepgram API Documentation: https://developers.deepgram.com/
- Deepgram Community: https://community.deepgram.com
- Deepgram Discord: https://discord.gg/deepgram