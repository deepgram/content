# Understanding Language Codes in Deepgram API for Transcription

When using the Deepgram API for transcriptions across different languages, it's important to correctly utilize the language codes, especially for languages with variations that could correspond to regional differences or aliases.

## Language Codes Overview
Deepgram API supports various languages, each identifiable by language codes. Often, these codes can refer to the same models, but some are distinct due to dialect or regional differences. Understanding how these codes work will ensure accurate transcription results.

**Aliases:** In many cases, different language codes for the same language (e.g., `sv` vs. `sv-SE` for Swedish) are aliases that route to the same transcription model. These aliases exist to accommodate different formatting in API requests and do not affect transcription accuracy.

**Distinct Models for Variations:** There are instances where language codes map to distinct models because they represent significantly different language variations. For instance:
- **German Variants:** `de` for German vs. `de-CH` for Swiss German. These require different models.
- **Chinese Dialects:** `zh-CN`, `zh-Hans` for Mandarin vs. `zh-TW`, `zh-Hant` for Traditional Chinese or `zh-HK` for Cantonese.
- **Portuguese Dialects:** `pt-BR` for Brazilian Portuguese vs. `pt-PT` for European Portuguese. These reflect substantial dialect differences.

**Examples of Non-Distinct Models:** Other codes may simply offer regional labeling but use the same model:
- English (`en-US` vs. `en-GB`) – The same model covers these variations.
- Dutch (`nl-BE` vs. `nl-NL`) – Utilizes one model.

## Conclusion
Understanding which language codes are aliases and which represent distinct models is crucial for optimal use of the Deepgram API. Identifying when and why to use each code ensures more accurate and regionally appropriate transcription results.

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram

## References
- [Deepgram GitHub Discussions](https://github.com/orgs/deepgram/discussions)
- [Deepgram Discord Community](https://discord.gg/deepgram)
- [Deepgram Documentation](https://developers.deepgram.com/docs/transcription)