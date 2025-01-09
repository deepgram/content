# Reducing Latency in Self-Hosted Deepgram Speech-to-Text Setup

In scenarios where self-hosted Deepgram Speech-to-Text setups encounter notable latency, such as a Time to First Byte (TTFB) delay of 1.38 seconds, it is essential to examine both configuration settings and network conditions to streamline performance effectively.

### Understanding and Configuring Key Options

Self-hosted environments offer flexibility but require careful tuning of configurations. The following settings are commonly adjusted to optimize speech-to-text streaming performance:

- **Interim Results**: Set this to `true` to receive real-time transcript updates during processing. These results might be subject to slight revisions but can help ensure responsiveness.

- **Endpointing**: A critical configuration that determines when speech segments are considered complete. A 300ms endpointing interval can be beneficial, but adjust based on the specific use-case requirements.

- **Model Selection**: Opt for a model tailored to the language and use-case. For instance, the `nova-2-general` is suitable for general purposes. Verify the model best fits your target language and domain.

- **Language Settings**: Ensure the correct language code is selected, such as `hi` for Hindi, to leverage model optimizations for specific languages.

- **Additional Features**: Features such as punctuation (`punctuate`), profanity filtering (`profanity_filter`), and smart formatting (`smart_format`) should be evaluated based on need, as they can influence performance.

### Aspects Influencing Latency

- **Network Conditions**: Latency issues could stem from network configurations. Ensure high bandwidth and low-latency network conditions between your application and the server.

- **Server Capacity**: Verify that the server hosting Deepgram is appropriately scaled in terms of computing resources to manage demand without bottlenecks.

- **Latency Testing**: Regular testing of latency across different network conditions and settings can provide insights into optimizations. Consider more frequent checks if implementing changes to the environment or settings.
  
### Conclusion
Reducing latency in self-hosted environments involves careful consideration of configuration parameters and network conditions. It is essential to test various settings to optimize the balance between performance and result accuracy.

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram

### Further Resources
- For a comprehensive guide to using the Deepgram API, visit [Deepgram Documentation](https://developers.deepgram.com/docs/getting-started-with-pre-recorded-audio).
- If using external libraries or tools such as [ffmpeg](https://ffmpeg.org/documentation.html), refer to their documentation for usage and integration details. 

By following these guidelines, you can more effectively manage and reduce latency in your self-hosted Deepgram Speech-to-Text system, ensuring a more responsive and accurate speech-to-text experience. 
