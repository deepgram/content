# Understanding Alternatives in Deepgram's Rest API

In handling audio transcriptions, users can often benefit from receiving multiple alternatives to ensure accuracy and select the most appropriate transcription based on context. While utilizing Deepgram's API, a feature referred to as "alternatives" allows this functionality.

## Lede
Deepgram's API offers a method to receive multiple transcription alternatives, though its availability and usage depend on the models used.

## Receiving Alternatives
The "alternatives" feature can be requested by appending the `alternatives` parameter in the API call, specifying the number of alternatives desired. For example:
```bash
curl --location 'https://api.deepgram.com/v1/listen?alternatives=2&model=nova' \
--header 'Content-Type: audio/wave' \
--header 'Authorization:  Your API KEY' \
--data-binary '@/YOUR FILE'
```

Note:
- The "alternatives" feature works with older models: `nova`, `base`, and `enhanced`. However, it's not supported in `nova-2` models.
- A key point is specifying an integer for the number of alternatives rather than a boolean value.

## Deprecated Feature
Be advised, though useful, the alternatives feature is deprecated for some newer models, specifically `nova-2`. Keep an eye on updates and documentation from Deepgram for alternatives or new approaches to achieving similar functionality.

## Common Issues
- Sending a request with `alternatives` on unsupported models like `nova-2` results in a "Bad Request" error. Ensure your request aligns with models that support the alternatives feature.
- If experiencing unexpected behavior or not receiving expected results, verify the model compatibility and syntax correctness.

## Conclusion
The alternatives feature is an invaluable tool within Deepgram's older models. Users should adjust their model and parameter usage according to the deprecations. For ongoing needs with multiple transcription options, Deepgram's community is also available for assistance and potential workarounds.

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram

## References
- [Deepgram API Documentation](https://developers.deepgram.com/docs/getting-started-with-pre-recorded-audio)
- [Deepgram JavaScript SDK](https://github.com/deepgram/deepgram-js-sdk)

Deepgram Discord Community: https://discord.gg/deepgram

By integrating these practices, users can optimize their use of Deepgram API alternatives feature effectively.