# Using Deepgram API to Retrieve Available TTS Voice Models

For developers looking to integrate Deepgram's text-to-speech (TTS) capabilities within applications, it can be essential to programmatically list all available voice models. Deepgram provides API endpoints to meet this requirement, allowing you to retrieve metadata about public and project-specific voice models.

## Retrieving Voice Models with Deepgram API

Deepgram offers two primary API endpoints to access information about available TTS voice models:

1. **Public Models Endpoint**
   - Endpoint: `https://developers.deepgram.com/reference/get-models`
   - Use this endpoint to fetch metadata about all the latest public voice models available through Deepgram. This can be helpful for applications aimed at a general audience where the public models suffice.

2. **Project-Specific Models Endpoint**
   - Endpoint: `https://developers.deepgram.com/reference/get-project-models`
   - This endpoint is used to retrieve metadata and details of all the voice models that a particular project has access to, including any private, non-public models unique to your project.

### Sample Payload Structure

The response from these endpoints includes a `tts` array with model metadata. Below is a sample structure of the data you will receive:

```json
{
    "name": "angus",
    "canonical_name": "aura-angus-en",
    "architecture": "aura",
    "languages": [
        "en",
        "en-IE"
    ],
    "version": "2024-11-19.0",
    "uuid": "11111111-2222-3333-4444-555555555555",
    "metadata": {
        "accent": "Irish",
        "color": "#BA80F5",
        "image": "https://static.deepgram.com/examples/avatars/angus.jpg",
        "sample": "https://static.deepgram.com/examples/voices/angus.wav",
        "tags": [
            "masculine"
        ]
    }
}
```

This payload provides essential information such as the model's name, languages supported, version, UUID, and additional metadata like accent, image, and sample audio.

### Integration

To integrate this functionality into your dashboard or any application:

- Make a GET request to the appropriate endpoint depending on your access needs (public or project-specific models).
- Parse the JSON response to dynamically display or implement model selection within your application.

**Note:** Authentication and proper request headers will be necessary to access these endpoints.

## Conclusion

Leveraging these endpoints allows developers to offer dynamic voice model selection options within applications, enabling tailored TTS experiences. For assistance or persistent issues, please [reach out](https://discord.gg/deepgram) to our community for support.

## References

- [Deepgram API Reference: Public Models](https://developers.deepgram.com/reference/get-models)
- [Deepgram API Reference: Project Models](https://developers.deepgram.com/reference/get-project-models)
