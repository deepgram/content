# Understanding Keyterm Token Limits in Deepgram

When using the Deepgram service, particularly with the nova-3 model, it's crucial to understand the constraints related to token usage, especially when working with keyterms. Here we provide clarity on token limits and best practices for efficiently utilizing keyterms.

A comprehensive understanding of the concept of tokenization is vital, as it helps in determining how keyterms are processed and interpreted by the model. We provide a [general article about tokenization](https://deepgram.com/ai-glossary/tokenization) that explains the basics.

### Keyterm Token Limits

Deepgram's token limits are not precisely documented per model. However, when handling keyterms, we estimate that roughly 500 tokens support around 100 keyterms. This ratio will vary based on each keyterm's length—single word keyterms will use fewer tokens compared to multi-word phrases.

Although keyterm prompting is billed per audio duration, if you attempt to send an excessive number of keyterms beyond the token limit, you may encounter an error, such as a `400 Bad Request` response. Thus, it is significant to strike a balance between the number of keyterms and the token limits to avoid such errors.

### Tools for Estimation

To help gauge token usage, we recommend using our [interactive token calculator](https://tokenizer.deepgram.com/). While it is tailored for our audio intelligence features, it provides a useful approximation applicable to keyterms.

### Cost Implications

Keyterm prompting in Deepgram is an add-on feature and is billed per audio duration regardless of the number of keyterms or tokens used. It’s worth noting that the actual pricing details for various use cases should always be confirmed through Deepgram's [pricing page](https://deepgram.com/pricing), as they are subject to change.

### Conclusion

By understanding token limits and utilizing the available tools to estimate token usage, you can efficiently utilize keyterms without encountering unexpected errors.

For further assistance, if issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [Deepgram Discord](https://discord.gg/deepgram)

#### References
- [Tokenization Article](https://deepgram.com/ai-glossary/tokenization)
- [Deepgram Pricing](https://deepgram.com/pricing)
- [Token Calculator](https://tokenizer.deepgram.com/)