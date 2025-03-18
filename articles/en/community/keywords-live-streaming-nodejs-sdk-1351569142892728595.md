# Integrating Keywords in Live Streaming with Deepgram's Node.js SDK

When working with Deepgram's Node.js SDK for live streaming audio transcription, integrating keywords can enhance the accuracy of recognizing specific terms within your audio content. However, users may find it challenging to understand where to apply these settings within the SDK environment.

### Integrating Keywords in Node.js SDK

Deepgram enables users to define keywords as query parameters when establishing a WebSocket connection for live streaming transcription. Here is a guide on how to incorporate keywords effectively within the Node.js SDK.

For utilizing models that support the keyword feature (such as Base or Nova-2), you can specify a single keyword or an array of keywords:

```javascript
 const connection = deepgram.listen.live({
    model: "nova-2",
    language: "nl",
    keywords: ["BBC"],
  });
```

#### Key Considerations:

- **Model Selection**: Ensure you are using a model that supports the keywords feature, such as Base or Nova-2. The keywords feature tends to perform well on these models, although testing individual performance is recommended.
- **Language Support**: Validate that your selected model provides adequate support for the language you are working with, as performance can vary.

### Troubleshooting and Support

If you encounter inconsistencies or issues with this configuration: 
 - Verify that the model you are using supports the language in question.
 - Experiment with different models if available, to assess which yields the best performance for your scenario.

**Support:** If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [https://discord.gg/deepgram](https://discord.gg/deepgram).

### Conclusion

Integrating keywords in the Deepgram Node.js SDK for live streaming can significantly boost transcription performance for pivotal terms in content. Ensuring correct parameter configurations and model compatibility is crucial for optimal usage. For intricate setups or persistent concerns, collaboration with our community or direct support channels can provide additional guidance.

### References

- [Deepgram Node.js SDK](https://github.com/deepgram/deepgram-js-sdk)
- [Keywords Documentation](https://developers.deepgram.com/docs/keywords)
- [Deepgram Community Discord](https://discord.gg/deepgram)