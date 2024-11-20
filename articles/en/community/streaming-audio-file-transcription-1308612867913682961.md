# Streaming Audio File Transcription with Deepgram

When working with Deepgram's transcription services, users often seek to transcribe pre-recorded audio in a streaming fashion to receive updates as the audio is processed. This guide outlines how to achieve streaming transcription of an audio file using Deepgram's available resources.

### Understanding Streaming vs. Pre-recorded Transcription
Deepgram offers two modes for transcription:
- **Streaming Transcription**: This mode processes audio data as it is being received, providing immediate transcriptions. It uses WebSockets for real-time processing.
- **Pre-recorded Transcription**: This mode processes complete audio files after they are fully uploaded, offering slightly lower word error rates due to more context being available from the full file.

### Recommended Approach for Streaming Pre-recorded Audio Files
To transcribe an audio file in a streaming fashion, you can use Deepgram's streaming capabilities via WebSockets to send chunks of pre-recorded audio. The live-streaming starter kit found in the Deepgram GitHub repository is an excellent starting point for this purpose. This tool allows you to simulate streaming by dealing with file data as if it were a real-time source, even though the file is stored.

#### Steps to Implement:
1. **Access the Live-Streaming Starter Kit**: Utilize the [live-streaming starter kit](https://github.com/deepgram/live-streaming-starter-kit) available on GitHub.
   - File to reference: `test_suite.py`.

2. **Configure WebSockets**: Establish a WebSocket connection to Deepgram using the endpoint `wss://api.deepgram.com/v1/listen`.

3. **Chunk and Send Data**: Stream the audio file by sending small chunks of it incrementally over the established connection. This simulates live audio being captured and sent for real-time transcription.

### Expected Results and Accuracy
While using the streaming model, bear in mind that the models for streaming and pre-recorded transcription are distinct. Therefore, the transcription results might not be identical, as pre-recorded transcription can often achieve slightly lower word error rates due to its ability to consider the entire audio context.

#### Comparative Performance:
- Streaming transcription results can be expected slightly faster but may have a marginally higher word error rate.
- Example benchmarks indicate an English word error rate of approximately 8.4% for pre-recorded and 10.7% for streaming models.

### Seeking Support
For further assistance, or to clarify questions regarding implementation or use-cases, join our [Discord](https://discord.gg/deepgram) or post your inquiries on [GitHub Discussions](https://github.com/orgs/deepgram/discussions) for community support and collaborative troubleshooting.

By following this approach, you can efficiently transcribe static audio files in a streaming fashion, leveraging Deepgram's robust API and development resources to optimize processing for your unique needs. 

---

**References**
- [GitHub Live-Streaming Starter Kit](https://github.com/deepgram/live-streaming-starter-kit)
- [Deepgram Developers Documentation](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio)