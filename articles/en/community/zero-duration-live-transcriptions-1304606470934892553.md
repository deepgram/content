# Resolving Zero Duration in Live Transcriptions

When using Deepgram's Live Transcription API, a common configuration issue might cause the transcriptions to return with a zero duration. This can often be traced back to incorrect parameter settings when making API requests for live audio processing. 

## Common Misconfiguration

One frequent warning occurs when the customer sets `multichannel=false` but also specifies a `channels` value greater than 1. This indicates that the channels are not being processed independently as might be intended. To accurately transcribe audio with multiple channels and obtain the correct duration, it's crucial to update your API request settings by enabling multichannel processing.

## Conclusion

Accurate live transcriptions with proper timestamping rely heavily on correctly setting up multichannel options when needed. Ensuring that `multichannel` is set to `true` when dealing with multiple audio channels will prevent issues related to zero duration and ensure the separate channels are properly recognized and processed. 

For detailed guidance, refer to our [multichannel documentation](https://developers.deepgram.com/docs/multichannel).

## References
- [Deepgram Multichannel Documentation](https://developers.deepgram.com/docs/multichannel)