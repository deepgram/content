# Migrating from Nova-2 to Nova-3 for Live Speech-to-Text with Deepgram SDK

When migrating from the Nova-2 to the Nova-3 language model for live speech-to-text transcription using the Deepgram SDK, several important considerations and updates are necessary to ensure a smooth transition. This article provides guidance based on Deepgram's official documentation.

## Key Differences Between Nova-2 and Nova-3

### 1. Keywords vs Keyterms

The most significant change is the transition from keywords to keyterms:

- **Nova-2 uses Keywords**: The older model uses the `keywords` parameter with the syntax `keyword:intensifier`
- **Nova-3 uses Keyterms**: The newer model uses the `keyterm` parameter with a simplified syntax

Example of Nova-3 keyterm usage:
```curl
curl \
  --request POST \
  --header 'Authorization: Token YOUR_DEEPGRAM_API_KEY' \
  --header 'Content-Type: audio/wav' \
  --data-binary @youraudio.wav \
  --url 'https://api.deepgram.com/v1/listen?model=nova-3&keyterm=important&keyterm=critical'
```

### 2. Multilingual Codeswitching

Nova-3 introduces support for multilingual codeswitching, which allows the model to transcribe content that contains multiple languages within the same audio. This is not available in Nova-2.

### 3. Enhanced Accuracy

Nova-3 generally offers improved transcription accuracy and performance across various use cases, particularly for non-English languages and specialized domains.

## Updating Your API Requests

When migrating from Nova-2 to Nova-3, make the following changes to your API requests:

1. Change the model parameter from `nova-2` to `nova-3`:
   ```
   model=nova-3
   ```

2. Replace any `keywords` parameters with the new `keyterm` format:
   ```
   # Before (Nova-2)
   keywords=example:5&keywords=test:2
   
   # After (Nova-3)
   keyterm=example&keyterm=test
   ```

3. Remove any intensifier values (the numbers after colons in keywords)

## SDK Implementation Example

Here's an example of how to implement Nova-3 with the JavaScript SDK:

```javascript
import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';

const deepgram = createClient(YOUR_DEEPGRAM_API_KEY);

// Nova-3 configuration
const options = {
  model: 'nova-3',
  language: 'en-US',
  smart_format: true,
  interim_results: true,
  endpointing: 300,
  utterance_end_ms: 1000,
  // Use keyterms instead of keywords
  keyterms: ['example', 'test']
};

// Create a connection
const connection = deepgram.listen.live(options);

// Add event listeners
connection.addListener(LiveTranscriptionEvents.TRANSCRIPT_RECEIVED, (data) => {
  console.log(data);
});
```

## Additional Considerations

1. **Testing**: Always test your implementation thoroughly after migration, as there may be subtle differences in the transcription output.

2. **Language Support**: Verify the languages you need are supported by Nova-3.

3. **SDK Version**: Ensure you're using the latest version of the Deepgram SDK that fully supports Nova-3.

## References
- [Deepgram Models Overview](https://developers.deepgram.com/docs/models-languages-overview)
- [Keyterm Documentation](https://developers.deepgram.com/docs/keyterm)
- [Legacy Keywords Documentation](https://developers.deepgram.com/docs/keywords)
- [Deepgram API Documentation](https://developers.deepgram.com/api-reference/)