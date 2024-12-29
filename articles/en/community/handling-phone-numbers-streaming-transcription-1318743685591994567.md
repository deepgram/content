# Handling Phone Numbers in Streaming Transcription with Deepgram

When using Deepgram's streaming transcription for phone numbers, especially those that end with repeated digits, extra digits might occasionally appear in the transcription output. 

To address this issue effectively, here are a few strategies:

### Model Selection

Deepgram offers various models with `nova-2`, including a specialized `conversationalai` model typically used for AI phone support applications. If faced with transcription inaccuracies in transcribing repeated digits, experiment with different models from the `nova-2` series for potentially better results, though keep in mind that switching models might impact other dimensions of transcription quality.

For users primarily focused on AI phone support, sticking with `conversationalai` is generally recommended, unless another model shows improved accuracy for specific cases like transcribing phone numbers.

### Feature Considerations

1. **Smart Formatting**: The `smart_format` feature attempts automatic formatting improvements but may not always perfectly handle numbers. Test its effectiveness by activating it with `smart_format=true` in your API call. 

   **Links**: [Smart Formatting Documentation](https://developers.deepgram.com/docs/smart-format)

2. **Numerals Feature**: This feature translates spoken numbers into their numeric counterparts. Enable using `numerals=true`. It might help to achieve clearer transcription outcomes for numeric data if Smart Formatting doesn't suffice.

   **Links**: [Numerals Feature Documentation](https://developers.deepgram.com/docs/numerals)

3. **Disabling Smart Formatting**: In specific scenarios where Smart Formatting generates undesired results, simplify your setup by turning it off and relying solely on the Numerals feature.

4. **Custom Post-processing**: Consider adding custom logic to refine the transcription output programmatically, especially if built-in Deepgram mechanisms do not fully resolve number-related errors.

### Conclusion

Experimenting with various configurations can potentially resolve most challenges related to digit repetition in phone numbers. Incorporating suggested features or customizing solutions will typically yield improved transcription accuracy tailored to specific needs like those experienced in conversational AI applications.

For broader user insights on similar issues, refer to discussions such as this one on [Getting Good Speech to Text for Auctions and Fundraisers](https://github.com/orgs/deepgram/discussions/957).

If challenges persist or require further insight, reach out to your Deepgram support representative (if available) or connect with our vibrant community at: https://discord.gg/deepgram

### References
- [Deepgram Model Overview](https://developers.deepgram.com/docs/models-languages-overview#nova-2)
- Discussions of transcription challenges in GitHub and Community forums.