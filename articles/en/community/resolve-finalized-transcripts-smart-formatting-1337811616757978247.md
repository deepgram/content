# Resolving Discrepancies in Finalized Transcripts with Smart Formatting

When using Deepgram's Speech-to-Text API, some users may encounter discrepancies in the finalized transcripts, even when previous interim transcripts appear accurate.

## Understanding the Issue

A situation was encountered where a finalized transcript returned an empty or incorrect result, whereas the interim transcript appeared accurate. This issue was linked to the configuration parameters used during the API request. Specifically, using both `numerals` and `smart_format` parameters simultaneously can lead to such inconsistencies.

### Parameters Overview

- **`numerals` Parameter:** This parameter formats numbers in the transcript.
- **`smart_format` Parameter:** Smart Formatting automatically formats numbers, dates, times, and more within the transcript for certain language models.

Both parameters attempt to handle number formatting, which can lead to conflicts if both are enabled. To resolve this issue, you should choose either `numerals` or `smart_format`, but not both, when dealing with number formatting.

## Solution

Review and adjust the parameters used in your API request configurations:

1. **Disable One of the Parameters:** If you're using `smart_format` with EN models, consider disabling `numerals` as Smart Formatting should handle number formatting adequately.

2. **Request Adjustments:** Ensure the parameters you use are appropriate for your needed outcome and compatible with one another.

Here is a parameter configuration example:

```plaintext
List(
  (model, 2-general),
  (tier, nova),
  (language, en),
  (smart_format, true),
  (measurements, false),
  (dictation, false),
  (profanity_filter, true),
  (filter_words, true),
  (endpointing, 1700),
  (interim_results, true),
  (no_delay, false),
  (alternatives, 1),
  (encoding, mulaw),
  (sample_rate, 8000),
  (tag, sample-tag)
)
```

## Additional Support

If issues persist or the system behaves inconsistently even after adjusting parameters, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [Deepgram Community](https://discord.gg/deepgram).

## Conclusion

Utilizing either `smart_format` or individual formatting parameters like `numerals` can prevent discrepancies in your Deepgram transcription results. Refer to the [Smart Formatting documentation](https://developers.deepgram.com/docs/smart-format) for a more comprehensive understanding of what Smart Formatting offers.

## References
- [Smart Formatting Documentation](https://developers.deepgram.com/docs/smart-format)
- [Deepgram Community](https://discord.gg/deepgram)