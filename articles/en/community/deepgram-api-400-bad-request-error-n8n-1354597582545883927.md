# Resolving Deepgram API 400 - Bad Request Error in n8n

When using the Deepgram API in n8n to process MP3 files from another HTTP request, users may encounter a "400 - Bad Request" error. This error often stems from issues related to audio encoding or unsupported data formats. Below are steps and recommendations to resolve this issue effectively.

## Understanding the Error

The specific error message returned by the Deepgram API typically indicates that the audio data submitted is "corrupt or unsupported." Common reasons for this error include:

- Incorrect or missing audio `encoding` in the query parameters.
- Mismatch between the actual audio encoding (e.g., MP3) and the selected audio `encoding` in the API request.

## Steps to Resolve

1. **Verify Audio Encoding and Sample Rate**
   - Ensure that both `encoding` and `sample_rate` settings are correctly configured in your query parameters. These settings are crucial for the API to process the audio correctly.

2. **Adjust Encoding Parameters**
   - If you have set `encoding` to a value like `linear16`, but your audio file is MP3, this discrepancy will cause an error. Refer to [Deepgram's supported audio encoding values](https://developers.deepgram.com/docs/encoding) to configure the correct encoding value for your audio file type.

3. **Test with Sample Files**
   - As part of troubleshooting, try using a sample audio file with known good parameters and verify if the API processes it successfully. This action can help identify if the issue is file-specific.


## Conclusion

Addressing encoding mismatches or improperly set parameters are common solutions to resolve the Deepgram "400 - Bad Request" errors. If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit the [Deepgram community](https://discord.gg/deepgram) for assistance.

By following the recommendations above, the integration between n8n and the Deepgram API can be configured to effectively handle various audio file formats without encountering errors.

## References
- [Deepgram API: Audio Encoding](https://developers.deepgram.com/docs/encoding)

