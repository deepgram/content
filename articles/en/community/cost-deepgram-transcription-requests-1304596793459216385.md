# Obtaining Cost of Deepgram Transcription Requests

When utilizing Deepgram's transcription services, users often need to ascertain the cost associated with each transcription request. This article outlines the steps and considerations for retrieving the cost of a transcription request using Deepgram's APIs and SDKs.

## Understanding Transcription Responses

While the `TranscribeFile` function from the Deepgram .NET SDK returns metadata such as the duration of the audio recording, it does not include direct information about the cost of the request. The cost details can be accessed using Deepgram's Manage API, but this data is not immediately available after the transcription request completes.

## Accessing Cost Information

To obtain the cost, use the ManageClient's `GetUsageRequest` method in the relevant SDK. However, it's important to note that there is a delay (ranging from a few seconds to a few minutes) before cost information becomes accessible. This delay occurs because the logging and usage data compilation is processed separately from the transcription results, which are prioritized.

### Suggested Approach

To efficiently acquire the cost data without interrupting the workflow, it's recommended to set up a system that queries for cost information at intervals until it becomes available. Implementing a message queue or a scheduled task can be a practical solution.

### Potential Considerations
- **Rate Limits**: Be mindful of API rate limits when polling for cost information.
- **Retries**: Implement retry logic to handle and recover from transient API errors.
- **Notifications**: Consider adding notifications to alert users when cost data becomes available.

## Conclusion

By integrating a queue or scheduled system to poll for usage data, applications can effectively retrieve cost information post-transcription. This approach ensures that the workflow remains smooth and uninterrupted while accommodating the delay in metrics availability.

## References
- [Transcription API Documentation](https://developers.deepgram.com/docs/getting-started-with-pre-recorded-audio)
- [Deepgram .NET SDK](https://github.com/deepgram/deepgram-dotnet-sdk)