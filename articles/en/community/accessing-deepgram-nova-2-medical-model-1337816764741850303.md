# Accessing the Deepgram Nova-2 Medical Model

Accessing specialized models like Deepgram's Nova-2 Medical model can enhance transcription tasks by providing accuracy tailored to medical terminology and context. This guide outlines how to access and use the Nova-2 Medical model effectively.

## Overview of the Nova-2 Medical Model

Deepgram's Nova-2 Medical model is designed to accurately transcribe medical audio content. It leverages advanced speech-to-text algorithms optimized for medical terminology, enabling precise transcription of complex medical language and jargon.

## Using the Nova-2 Medical Model in Your Request

To utilize the Nova-2 Medical model, you need to include the model option `nova-2-medical` in your transcription request. This ensures that Deepgram processes the audio using the model specifically trained for medical audio content, enhancing transcription quality for medical recordings.

### Example Request

When making a request to the Deepgram API, specify the model in your request parameters. Here is an example format:

```plaintext
https://api.deepgram.com/v1/listen?model=nova-2-medical
```

Ensure that your requests to the Deepgram API endpoint use the correct API key and adhere to the required formatting for parameters.

## Resources and Documentation

For more information on available models and languages, including details on the Nova-2 Medical model, visit the [Deepgram Model Documentation](https://developers.deepgram.com/docs/models-languages-overview#nova-2).

If issues persist or system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our [community for assistance](https://discord.gg/deepgram).

## Conclusion

Integrating the `nova-2-medical` model into your Deepgram API requests can significantly improve transcription accuracy for medical audio content. By using the correct model option, you ensure that your application benefits from Deepgram’s specialized language processing capabilities.

## References

- [Deepgram AP Documentation](https://developers.deepgram.com/docs/models-languages-overview#nova-2)
- [Deepgram Community](https://discord.gg/deepgram)