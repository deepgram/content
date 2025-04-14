# Understanding Alternatives in Deepgram's API

When transcribing audio with Deepgram, you may want to receive multiple possible interpretations of the same speech. The `alternatives` parameter allows you to receive multiple transcription options, helping you choose the most appropriate one based on your specific context or implement confidence-based decision making.

## What Are Alternatives?

Alternatives are different possible transcriptions of the same audio segment. Each alternative comes with its own confidence score, allowing you to evaluate which interpretation is most likely to be correct.

## Model Support for Alternatives

The availability of alternatives varies by model:

| Model | Alternatives Support |
|-------|---------------------|
| Nova-3 | Not supported |
| Nova-2 | Not supported |
| Nova | Supported |
| Enhanced | Supported |
| Base | Supported |

As Deepgram continues to evolve its models, support for alternatives is generally being phased out in favor of other approaches for managing uncertainty in transcription.

## Using the Alternatives Parameter

For supported models, you can request alternatives by adding the `alternatives` parameter to your API request. The value should be an integer indicating how many alternative transcriptions you want to receive:

```bash
curl --request POST \
  --url 'https://api.deepgram.com/v1/listen?alternatives=2&model=nova' \
  --header 'Authorization: Token YOUR_DEEPGRAM_API_KEY' \
  --header 'Content-Type: audio/wav' \
  --data-binary '@youraudio.wav'
```

## Understanding the Response

When using alternatives, the API response will include multiple entries in the `alternatives` array, each with its own transcript and confidence score:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "this is the most likely transcription",
            "confidence": 0.9842,
            "words": [...]
          },
          {
            "transcript": "this is the second most likely transcription",
            "confidence": 0.8765,
            "words": [...]
          }
        ]
      }
    ]
  }
}
```

## Current Best Practices

Since alternatives are not supported in the newest models (Nova-2 and Nova-3), consider these current best practices:

1. **Use Word-Level Confidence**: Both Nova-2 and Nova-3 provide detailed confidence scores for each word, which can be more useful than alternatives for many applications.

2. **Consider Search Feature**: If you're looking for specific phrases or terms, the [search feature](https://developers.deepgram.com/docs/search) might be more appropriate.

3. **Model Selection Trade-offs**: If alternatives are critical for your use case, you may need to use the Nova model instead of Nova-2 or Nova-3. Consider the trade-offs in accuracy and features.

## Code Example: Working with Word-Level Confidence

```javascript
// Process results focusing on word-level confidence
function processTranscription(result) {
  const words = result.results.channels[0].alternatives[0].words;
  
  // Find low-confidence words
  const uncertainWords = words.filter(word => word.confidence < 0.75);
  
  // Log uncertain words for further review
  if (uncertainWords.length > 0) {
    console.log("Words with low confidence:", uncertainWords);
  }
  
  return result.results.channels[0].alternatives[0].transcript;
}
```

## References

- [Deepgram API Reference](https://developers.deepgram.com/api-reference/)
- [Deepgram Models Overview](https://developers.deepgram.com/docs/models-languages-overview)

For specific questions about alternatives or help with transcription confidence, join our [Discord community](https://discord.gg/deepgram).