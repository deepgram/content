# Troubleshooting Deepgram Transcript Requests Stuck in Pending

When using the Deepgram Speech-to-Text API, it can be concerning to notice that your transcript requests are stuck in the "Pending" state in the Usage dashboard. Understanding and resolving this issue is crucial for ensuring smooth operation and accurate transcriptions.

### Understanding Request States

When requests to the Deepgram API are made, they pass through various states before they are completed. Common states include:
- **Pending:** The request has been received, but processing is not yet complete.
- **OK:** The request has been successfully processed, and results are available.
- **Unknown:** There are issues or problems during processing that preclude a successful transcription.

Pending requests should eventually progress to another state. However, if they remain pending for an extended period, it may indicate an issue with the request parameters or the audio data sent.

### Common Causes for Pending Requests

1. **Improper Use of Query Parameters:**
   - Ensure query parameters are used correctly.  Certain combinations of API parameters can sometimes cause processing issues.

2. **Invalid Audio Data:**
   - The audio data format must be correct. Ensure the audio file formats and encodings match the API requirements outlined in [Deepgram's Audio Formats documentation](https://developers.deepgram.com/docs/audio-formats).

3. **Check Program Logic:**
   - Review your implementation to ensure the coding logic doesn't inadvertently cause incomplete or incorrect requests. Proper closure of sockets is essential to prevent such issues.

### How to Resolve Issues

- **Verify API Usage:** Double-check your API requests for correct parameters and data format.
- **Refer to Documentation:** Make use of Deepgram documentation to ensure your requests conform to expected standards.

### Conclusion

Pending requests are generally temporary states, but persistent issues may require deeper investigation into how requests are configured and formatted. Following correct parameterization and ensuring valid input data are fundamental steps.

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [Deepgram Community](https://discord.gg/deepgram)

### References
- Deepgram API Documentation: [Deepgram API](https://developers.deepgram.com/reference/deepgram-api-overview)
- Audio Formats Documentation: [Audio Formats](https://developers.deepgram.com/docs/audio-formats)
