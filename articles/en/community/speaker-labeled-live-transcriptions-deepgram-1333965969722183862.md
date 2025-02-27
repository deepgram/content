# How to Implement Speaker-Labeled Live Transcriptions with Deepgram

To achieve speaker-labeled transcriptions using Deepgram's live transcription services, follow these guidelines.

### Overview

Deepgram provides the capability to generate real-time transcriptions with speaker diarization from live audio sources, such as microphones. This is particularly valuable for scenarios like interviews, meetings, or any situation where multiple speakers interact and you need to distinguish between them in the transcript.

### Setting Up Live Transcription with Speaker Diarization

#### Step 1: Sign up and Obtain API Key

- Start by creating a [Deepgram account](https://console.deepgram.com/signup?jump=keys) and acquiring an API key. This key will allow you to authenticate and interact with Deepgram's API.

#### Step 2: Choose Your SDK and Implementation Method

Deepgram supports various programming languages through its SDKs. Choose the SDK that matches your development environment:

- [JavaScript/TypeScript SDK](https://github.com/deepgram/deepgram-js-sdk)
- [Python SDK](https://github.com/deepgram/deepgram-python-sdk)
- [Go SDK](https://github.com/deepgram/deepgram-go-sdk)
- [.NET SDK](https://github.com/deepgram/deepgram-dotnet-sdk)
- [Rust SDK](https://github.com/deepgram/deepgram-rust-sdk)

Choose the SDK that fits your development environment and proceed to set it up using the respective documentation.

#### Step 3: Enable Speaker Diarization

Access Deepgram's documentation on [speaker diarization](https://developers.deepgram.com/docs/diarization) to understand the required parameters. Make sure to activate the `diarize` option in your API request to receive speaker-separated transcriptions. The `diarize` parameter should be set to `true`.

Sample output with labeled speakers looks as follows:

```
[Speaker:0] Hello, and thank you for calling premier phone service. Please be aware that this call may be recorded for quality and training purposes.
[Speaker:0] My name is Beth, and I will be assisting you today. How are you doing?
[Speaker:1] Not too bad. How are you today?
[Speaker:0] I'm doing well. Thank you. May I please have your name?
[Speaker:1] My name is Blake...
```

Note that currently, the feature labels speakers numerically, i.e., Speaker 0, Speaker 1, etc. Custom speaker labels are not yet supported.

#### Step 4: Use Multichannel for Complex Audio

Besides diarization, Deepgram offers [multichannel transcription](https://developers.deepgram.com/docs/multichannel-vs-diarization) for advanced scenarios where separating audio channels is required.

### Conclusion

Leveraging Deepgram's live transcription API with diarization enables you to efficiently distinguish between speakers in real-time. For any challenges encountered during implementation, consult the Deepgram [documentation](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio) or join the [Deepgram Discord Community](https://discord.gg/deepgram) for assistance.

### References

- [Deepgram Speaker Diarization Documentation](https://developers.deepgram.com/docs/diarization)
- [Deepgram SDKs on GitHub](https://github.com/deepgram)