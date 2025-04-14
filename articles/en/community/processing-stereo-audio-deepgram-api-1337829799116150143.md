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
Once combined, it's necessary to convert the sample rate to 16kHz and prepare the buffer for API submission. Use a high-quality resampler to maintain audio quality:

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

// Use AVAudioConverter for high-quality resampling
let converter = AVAudioConverter(from: format, to: targetFormat)!
var error: NSError?
let status = converter.convert(to: targetBuffer, error: &error) { 
    // Conversion logic here
}

if status != .haveData || error != nil {
    print("Audio conversion failed with status: \(status) and error: \(String(describing: error))")
    return nil
}
```

## Sending Data to Deepgram API
Ensure that the audio data is formatted correctly before sending it to the API. Here are the essential parameters for proper API functionality:

```json
{
  "model": "nova",
  "encoding": "linear16",
  "sample_rate": 16000,
  "channels": 2,
  "multichannel": true
}
```

- **model**: Use "nova" for best results with stereo audio
- **encoding**: Set to "linear16" for 16-bit PCM
- **sample_rate**: Set to 16000 for optimal performance
- **channels**: Set to 2 for stereo input
- **multichannel**: Set to true to process each channel independently

## Handling Channel-Specific Results

When using multichannel processing, the API response will include separate transcriptions for each channel:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "System audio transcription...",
            "confidence": 0.95
          }
        ]
      },
      {
        "alternatives": [
          {
            "transcript": "Microphone transcription...",
            "confidence": 0.92
          }
        ]
      }
    ]
  }
}
```

## Troubleshooting Transcription

If the transcription results merge the input from both channels, check the following aspects:
- **Audio Format**: Ensure the audio is properly formatted as stereo with correct channel separation
- **API Parameters**: Verify that both `channels` and `multichannel` parameters are set correctly
- **Sample Rate**: Confirm the audio is properly resampled to 16kHz

## Reach Out for Support

If issues persist or the system behavior seems inconsistent, reach out to our community for assistance: [Deepgram Community](https://discord.gg/deepgram)

## References
- [AVAudioPCMBuffer Documentation](https://developer.apple.com/documentation/avfaudio/avaudiopcmbuffer)
- [Deepgram API Documentation](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio)
- [Deepgram Multichannel Audio Guide](https://developers.deepgram.com/docs/multichannel-audio)