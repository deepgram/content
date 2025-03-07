# Migrating from Nova-2 to Nova-3 for Live Speech-to-Text with Deepgram SDK

When migrating from the Nova-2 to the Nova-3 language model for live speech-to-text transcription using the Deepgram SDK, several important considerations and updates are necessary to ensure a smooth transition. This article provides guidance on how to effectively make this migration.

## Updating the SDK

To utilize the Nova-3 model, ensure that your Deepgram SDK version is up-to-date. As of this writing, using version 3.11.2 or later is recommended. This version includes necessary updates and bug fixes that facilitate successful connections and data processing with the Nova-3 model.

## Transition from Keywords to Keyterms

The Nova-3 model no longer supports the use of 'keywords' in the transcription requests. Instead, 'keyterms' should be utilized, which are structured differently. Here’s how they differ:

- **Keyterms**:
  ```curl
  curl \
    --request POST \
    --header 'Authorization: Token YOUR_DEEPGRAM_API_KEY' \
    --header 'Content-Type: audio/wav' \
    --data-binary @youraudio.wav \
    --url 'https://api.deepgram.com/v1/listen?model=nova-3&keyterm=KEYTERM'
  ```

- **Old Keywords**:
  ```curl
  curl \
    --request POST \
    --header 'Authorization: Token YOUR_DEEPGRAM_API_KEY' \
    --header 'Content-Type: audio/wav' \
    --data-binary @youraudio.wav \
    --url 'https://api.deepgram.com/v1/listen?keywords=KEYWORD:INTENSIFIER'
  ```

Ensure you adapt your request structure to accommodate these differences when changing models.

## Connecting to Deepgram with the Nova-3 Model

When connecting your application to Deepgram using the Nova-3 model for live transcription, ensure your connection strings and parameters are correctly configured. The connection should specify the `model` parameter as `nova-3`, and other typical parameters include settings for `punctuation`, `language`, `encoding`, `sample_rate`, and `interim_results`.

Here is a basic example in code:

```javascript
import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';

const client = createClient('YOUR_DEEPGRAM_API_KEY');

async function startLiveTranscription() {
  const connection = await client.listen.live({
    model: 'nova-3',
    punctuate: false,
    language: 'en-GB',
    encoding: 'linear16',
    sample_rate: 44100,
    interim_results: true
  });
  // Add event listeners and handling logic here
}
```

## Performance Considerations

Some users have observed differences in performance characteristics when comparing Nova-2 to Nova-3. During live operations, Nova-3 might exhibit different latency or processing speeds. If performance does not meet expectations, consider reviewing the configurations or optimizations within your application.

## Conclusion

Transitioning to the Nova-3 model requires updates to both your SDK version and request parameters. Ensure these elements are correctly configured to harness the improvements and capabilities of Nova-3.

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram

## References
- [Deepgram JS SDK v3.11.2 Release](https://github.com/deepgram/deepgram-js-sdk/releases/tag/v3.11.2)
- [Deepgram API Documentation](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio)