# Processing Stereo Audio with Two Channels using Deepgram API

When integrating stereo audio with separate channels (e.g., system audio and microphone input) into the Deepgram API, it's important to ensure that each channel remains distinct in the transcription. This guide describes a method to handle stereo audio input for macOS users, including system audio and microphone, by ensuring proper API usage and formatting.

## Understanding the Audio Input and Processing

### Audio Input Sources
- **System Audio**: Typically a mono audio input recorded at 48kHz.
- **Microphone**: Another mono audio input recorded at 48kHz.

### Combining Audio Sources
The two audio sources are combined into a stereo AVAudioPCMBuffer where the system audio is assigned to the left channel and the microphone audio to the right channel. This is achieved by using the AVAudioFormat and ensuring that channels are set correctly.

Example code snippet to create a stereo buffer:
```swift
// Create stereo buffer
let format = AVAudioFormat(commonFormat: .pcmFormatFloat32,
                          sampleRate: 48000,
                          channels: 2,
                          interleaved: false)!
guard let stereoBuffer = AVAudioPCMBuffer(pcmFormat: format,
                                         frameCapacity: AVAudioFrameCount(chunkSize)) else {
    return
}
```

### Downsampling Audio
Once combined, it's necessary to convert the sample rate to 16kHz and prepare the buffer for API submission.

Example conversion:
```swift
guard let targetFormat = AVAudioFormat(
    commonFormat: .pcmFormatInt16,
    sampleRate: 16000,
    channels: 2,
    interleaved: true
) else {
    print("Failed to create target format")
    return nil
}
// Your conversion logic...
return Data(bytes: channelData[0], count: dataLength)
```

## Sending Data to Deepgram API
Ensure that the audio data is formatted correctly before sending it to the API. Here are the essential parameters for proper API functionality:

```json
{
  "channels": "2",
  "multichannel": "true"
}
```
- **Channels**: Set to 2 to denote stereo input.
- **Multichannel**: Set to `true` to ensure the API treats each channel independently.

## Troubleshooting Transcription

If the transcription results merge the input from both channels, check the following aspects:
- **Ensure Interleaved is Set Correctly**: When converting the audio, whether `interleaved` is set might affect the input format Deepgram expects.
- **Validate Buffer Data**: Make sure the buffer accurately represents stereo (separate left/right channels) before sending to Deepgram.

Often, setting `interleaved` to false initially for buffer creation and true for conversion resolves confusion in channel separation, as Deepgram expects a specific format.

## Reach Out for Support

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [Deepgram Community](https://discord.gg/deepgram)

## References
- [AVAudioPCMBuffer Documentation](https://developer.apple.com/documentation/avfaudio/avaudiopcmbuffer)
- [Deepgram API Documentation](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio)