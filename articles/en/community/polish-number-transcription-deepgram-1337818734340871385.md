# Improving Polish Number Transcription with Deepgram

When transcribing live audio streams with Deepgram's Speech-to-Text (STT) model, users may experience difficulties with recognition of specific types of content, such as sequences of numbers, especially in languages other than English. This issue commonly affects Polish number sequences like phone numbers.

## Challenges with Transcribing Polish Numbers

Users have reported that Deepgram's models handle numerical sequences in English quite effectively, formatting them in a clear way. However, for languages such as Polish, similar functionality isn't always immediately effective, even when utilizing the `keywords` feature to improve accuracy by including numbers written as words (e.g., "jeden," "dwa," etc.).

### Sample LiveOptions Configuration

Here is a sample configuration used for trying to transcribe Polish sequences:

```
self.options = LiveOptions(
    model="nova-2",
    language="pl",
    encoding="linear16",
    channels=1,
    sample_rate=16000,
    smart_format=True,
    punctuate=True,
    utterance_end_ms="1000",
    endpointing=200,
    interim_results=True,
    numerals=True,
    keywords=["jeden", "dwa", "trzy", "cztery", "pięć", "sześć", "siedem", "osiem", "dziewięć"]
)
```

While this configuration works well with other aspects of transcription, number recognition remains troublesome.

## Steps Towards Improved Accuracy

Deepgram is actively working on expanding language capabilities in its models. The new **nova-3** model is expected to offer improved support for a wider range of languages, including Polish, though currently, it supports only English. Furthermore, Deepgram has introduced new features that can enhance transcription accuracy:

- **Keyterm Feature:** This new API feature, currently available in nova-3, is designed to work more effectively compared to the previous keywords feature—providing potentially better handling of specific words or phrases in transcription tasks.

For further reading, explore:

- [Deepgram's Nova-3 Models Overview](https://developers.deepgram.com/docs/models-languages-overview#nova-3)
- [Deepgram Keyterm Documentation](https://developers.deepgram.com/docs/keyterm)

## Conclusion

Continued iteration on Deepgram's model features and capabilities seeks to provide refined solutions to current transcription challenges for non-English languages, including Polish. As the nova-3 model becomes available with broader language support, users may see these difficulties mitigated. 

For those experiencing persistent numbers recognition issues or any inconsistency in results, reaching out to Deepgram support representatives or visiting the [Deepgram community](https://discord.gg/deepgram) is recommended, where more specialized support can be offered.

### References:

For more insights and updates, the following documentation and community links provide additional information:

- [Deepgram Models and Languages Overview](https://developers.deepgram.com/docs/models-languages-overview#nova-3)
- [Deepgram Keyterm Feature](https://developers.deepgram.com/docs/keyterm)
- [Deepgram Community](https://discord.gg/deepgram)