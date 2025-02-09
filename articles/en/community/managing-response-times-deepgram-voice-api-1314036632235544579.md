# Managing Response Times for Deepgram Voice API


When developing a conversational AI platform using Deepgram's Speech-to-Text API, ensuring consistent response times is crucial to maintain the fluidity and effectiveness of interactions. Delays over a few seconds can interrupt the flow of conversation, leading to a suboptimal user experience.

## Understanding Transcription Speed

Deepgram provides several model options for transcription, including their in-house models such as *nova-2*, which are optimized for speed and scalability. In contrast, the Whisper models tend to be slower due to their architectural design, which may contribute to longer transcription times.

### Predicting and Preventing Delays

While specific guarantees on response times (Service-Level Agreements) are not available, there are strategies you can employ to potentially mitigate delay issues:

- **Model Selection:** Opt for Deepgram's proprietary models like *nova-2* for faster and more reliable transcription.
- **Optimize Audio Files:** Consider splitting larger audio files into smaller segments; this can sometimes reduce processing delays.
- **Parameter Tuning:** Carefully adjust the parameters in your API requests to match your needs without overloading the system.

### API Timeout Considerations

Be aware of the system's default timeout settings. For example, Deepgram imposes a 10-minute timeout on all transcription requests, meaning that any request that takes longer will be terminated with a 504 error.

## Troubleshooting and Support

In case of persistent delays or unexpected system behavior, gather as much contextual information about the problem as possible, such as:

- `request_id` for your API transactions.
- The full API request URL with parameters.
- Code snippets detailing your implementation.

With this data, reach out to your Deepgram support representative or visit the community support platforms for assistance: [Discord community](https://discord.gg/deepgram).

## Conclusion

By selecting the appropriate model and optimizing your requests, you can potentially achieve faster response times conducive to live conversation workflows. Additionally, staying in tune with Deepgram's community channels provides a resource for troubleshooting and improving your integration.

## References

- [Deepgram API Documentation](https://developers.deepgram.com/docs/)
- [Join Deepgram Community on Discord](https://discord.gg/deepgram)