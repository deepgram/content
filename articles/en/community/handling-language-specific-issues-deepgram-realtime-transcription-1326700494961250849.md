# Handling Language-Specific Issues in Deepgram Real-Time Transcription

When working with Deepgram's real-time transcription, particularly using the Nova-2 model, users may encounter issues when trying to switch from transcribing English to other languages. This document provides insights into resolving connection issues that occur with non-English languages during real-time transcription.

### Understanding Language Support

Deepgram's Nova-2 model supports multiple languages for both pre-recorded and live transcription. It's crucial to set the `language` parameter correctly in your function to ensure successful transcription. A comprehensive list of supported languages and their respective codes is available in Deepgram's [Models & Languages Overview](https://developers.deepgram.com/docs/models-languages-overview).

### Common Issues and Troubleshooting

If your connection works with English but fails with other languages, the problem often lies in incorrect implementation or an unsupported language code. It is advisable to:

- **Check Language Code:** Ensure that the language code passed to the `createDeepgramConnection` function is correctly spelled and supported by the Nova-2 model.
- **Error Handling:** Implement comprehensive error handling to capture specific errors returned by the Deepgram API.

Below is a representative function outline in a framework-agnostic manner:

```javascript
function createDeepgramConnection(language) {
    console.log('Creating Deepgram connection for language:', language);
    const conn = deepgram.listen.live({
        model: 'nova-2',
        language: language,
        punctuate: true,
        smart_format: true,
    });

    conn.on(LiveTranscriptionEvents.Open, () => {
        console.log(`Deepgram connection opened for language: ${language}`);
        conn.on(LiveTranscriptionEvents.Transcript, (data) => {
            // Process the transcript data
        });

        conn.on(LiveTranscriptionEvents.Close, () => {
            console.log(`Deepgram connection closed for language: ${language}`);
        });
    });

    conn.on('error', (error) => {
        console.error(`Deepgram connection error:`, error);
    });

    conn.keepAlive();

    return conn;
}
```

### Additional Support

If you continue to experience issues after verifying the language code and your implementation, it could be beneficial to reach out to Deepgram support. "If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [https://discord.gg/deepgram](https://discord.gg/deepgram)"

### Conclusion

Successfully configuring real-time transcription for multiple languages involves understanding the supported languages and correctly implementing the language parameter in the API call. With the correct setup and troubleshooting techniques, users can utilize Deepgram's robust platform for diverse language transcription needs.

#### References
- [Deepgram Models & Languages Overview](https://developers.deepgram.com/docs/models-languages-overview)