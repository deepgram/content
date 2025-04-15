# Understanding Language Support for Nova-2 Phonecall Model

For users working with Deepgram's speech-to-text capabilities, understanding the language support for different models is crucial to choosing the correct setup for specific use cases.

When considering the `nova-2-phonecall` model type explicitly configured for transcribing phone calls using Deepgram’s speech-to-text API, it's important to note that this option currently supports English (EN or EN-US) as described in our [models and languages overview documentation](https://developers.deepgram.com/docs/models-languages-overview#nova-2).

## Alternatives to `nova-2-phonecall`

### Nova-2 Language-Specific Models
For transcribing audio in non-English languages, you might consider using Deepgram's language-specific options in the Nova-2 series. Each language supported will have its own specific model type to maximize accuracy for the target language.

### Nova-3 Multilingual Models
Another alternative is the Nova-3 multilingual model, which supports a broader range of languages within one model configuration. This can be a great choice for applications where multiple languages are expected within the same context or organization.

## Use Case: Transcribing Multilingual Phone Calls
If your use case involves transcribing phone calls in various languages, and not just English, using the Nova-2 language-specific models or Nova-3 multilingual models would be a more appropriate choice.

## Conclusion
Although the `nova-2-phonecall` model is optimized for English phone call transcripts, Deepgram offers diverse solutions for multilingual audio transcription. If you need to transcribe audio in languages other than English, explore our [Nova-2 language-specific](https://developers.deepgram.com/docs/models-language-options) or [Nova-3 multilingual models](https://developers.deepgram.com/docs/models-nova-3) to find a match for your requirements.

If issues persist or system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [Deepgram Community](https://discord.gg/deepgram)

### References
- [Deepgram Models and Languages Overview](https://developers.deepgram.com/docs/models-languages-overview#nova-2)
- [Nova-2 Language Specific Options](https://developers.deepgram.com/docs/models-language-options)
- [Nova-3 Multilingual Models](https://developers.deepgram.com/docs/models-nova-3)