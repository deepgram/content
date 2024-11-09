# Deploying Deepgram Speech-to-Text on AWS with Lambda and WebSockets

## Deploying Deepgram Speech-to-Text on AWS with Lambda and WebSockets

Leverage the power of Deepgram's Speech-to-Text capabilities by integrating it into a serverless environment on AWS using AWS Lambda and API Gateway WebSockets. This guide will walk you through setting up a simple test application to transcribe speech with minimal effort, ideal for quick proof-of-concept (POC) projects.

### Overview

Deepgram provides robust APIs for both pre-recorded and live transcription, ideal for real-time audio processing. Integrating these capabilities into AWS's serverless infrastructure allows for scalability and efficiency, reducing overhead costs and improving responsiveness.

### Prerequisites

- AWS Account with access to Lambda, API Gateway, and IAM roles.
- Deepgram API Key.
- Basic understanding of AWS Lambda and WebSockets.
- Familiarity with any programming language supported by Deepgram SDKs: Node.js, Python, C#, Go, or Rust.

### Setup Deepgram SDK

Start by setting up the Deepgram SDK in your preferred programming language. Examples for basic setups are:

**JavaScript (Node.js)**:

```javascript
const deepgram = new Deepgram('YOUR_DEEPGRAM_API_KEY');
const response = await deepgram.transcription.preRecorded({
  buffer: audioBuffer,
  mimetype: 'audio/wav'
});
```

**Python**:

```python
from deepgram import Deepgram

dg_client = Deepgram('YOUR_DEEPGRAM_API_KEY')
response = dg_client.transcription.prerecorded(audio_url='YOUR_AUDIO_FILE_URL')
```

**C# (.NET)**:

```csharp
DeepgramClient deepgram = new DeepgramClient("YOUR_DEEPGRAM_API_KEY");
Transcript response = await deepgram.Transcription.PrerecordedAsync("YOUR_AUDIO_FILE_URL");
```

**Go**:

```go
deepgram := deepgram.NewClient("YOUR_DEEPGRAM_API_KEY")
response, _ := deepgram.Transcription().Prerecorded(deepgram.AudioURL{URL: "YOUR_AUDIO_FILE_URL"}).Do()
```

### AWS Lambda Integration

1. **Create a Lambda Function**:
    - Navigate to AWS Lambda and create a new function.
    - Use a runtime environment compatible with your Deepgram SDK of choice.

2. **Set Up API Gateway**:
    - Create an API and configure WebSocket communication.
    - Deploy the API and link it with the Lambda function.

3. **Modify Lambda Permissions**:
    - Ensure your Lambda function has permissions to access the Internet and the Deepgram API.

4. **Deploy and Test**:
    - Deploy the setup and perform end-to-end testing with different audio scenarios.

### Conclusion

Embedding Deepgram's transcription services within AWS serverless architecture streamlines the transcription process, enhances scalability, and significantly reduces the entry barrier for quick experimentation or deployment. Refer to the examples on Deepgram’s GitHub repositories for Node.js, Python, Go, and .NET for initial setups and adapt them as needed for AWS Lambda.

### References

- Deepgram JavaScript SDK: [GitHub](https://github.com/deepgram/deepgram-js-sdk)
- Deepgram Python SDK: [GitHub](https://github.com/deepgram/deepgram-python-sdk)
- Deepgram Go SDK: [GitHub](https://github.com/deepgram/deepgram-go-sdk)
- Deepgram .NET SDK: [GitHub](https://github.com/deepgram/deepgram-dotnet-sdk)
- Deepgram Documentation: [Developers Portal](https://developers.deepgram.com/)