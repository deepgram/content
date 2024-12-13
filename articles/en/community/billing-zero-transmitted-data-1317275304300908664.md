# Understanding Billing for Zero Transmitted Data in Deepgram

When using Deepgram's API services, you might wonder about the billing implications when no data is transmitted, particularly if you've noticed being charged for connections where encryption wasn't used and zero words were processed.

### Minimum Billing and Connection Charges
Deepgram implements a minimum billing policy based on your connection usage, even in cases where no audio is processed. This ensures that resources allocated to establish and maintain the connection are covered. The minimum charge is generally recorded for a second of audio even when less than that might have been processed or when encryption is not utilized. This is a standard practice to account for the connection overhead.

### Connection Management
Every time a connection is established to Deepgram's servers, resources are allocated to manage and potentially process data from the connection. This can include:
- Network resources
- Server and processing time

Even without transmitting audio content, these costs are considered when establishing the minimum charge.

### What Can You Do?
If you believe the charges do not correspond with your expected usage, consider reviewing your connection logic or reach out directly to Deepgram support for a detailed evaluation of your account activities.

### Conclusion
It's essential to monitor connection events closely and ensure that API calls are aligned with your intended usage to avoid unexpected charges. If issues persist or the system behavior seems inconsistent, reach out to [Deepgram's community](https://discord.gg/deepgram) for support.

#### References
- [Deepgram's Pricing FAQ](https://developers.deepgram.com/docs/pricing)
- [Community Support on Discord](https://discord.gg/deepgram)