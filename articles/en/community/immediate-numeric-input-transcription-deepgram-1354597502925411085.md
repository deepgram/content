# Ensuring Immediate Transcription for Numeric Inputs with Deepgram

In certain scenarios, such as when capturing short numeric inputs (e.g., CVV codes) through Deepgram, users may face challenges where the transcription does not occur immediately, but waits indefinitely or appends repeated numbers. Here, we'll explore how to ensure that such short numeric inputs are transcribed immediately, providing accurate results more efficiently.

## Common Solutions

### Use the `no_delay` Parameter
When dealing with short numeric inputs in live-streaming audio, consider applying `no_delay=true` to your API request. **Deepgram's smart formatting mechanism** waits to return transcriptions of numbers until the speaker continues to non-numerical speech. By setting `no_delay` to true, you can override this behavior, prompting Deepgram to provide transcription results instantly, without waiting for other inputs.

Refer to the official Smart Format documentation [here](https://developers.deepgram.com/docs/smart-format#using-no-delay) for further insights.

### Utilize the CloseStream Message
If you are utilizing Deepgram’s WebSocket for live streaming, sending a CloseStream message helps in force-ending the current audio stream. This is especially helpful for short utterances. Once you identify the end of a numeric sequence, you should send a text frame containing `{"type": "CloseStream"}` to indicate no further input is expected, prompting immediate transcription.

### Modifying Endpointing
Configure endpointing values effectively to detect speech ending more accurately. Shorter endpointing values might help in noisy environments. Adjust your configuration to ensure Deepgram isn't waiting excessively before transcribing short sequences.

### Enhance Numeric Formatting
- **Numerals Parameter**: Enable the `numerals` parameter if applicable for your use case. Make sure `smart_format` is off to avoid formatting conflicts.
- **Smart Formatting Disabled**: Disabling smart formatting could improve handling of numeric sequences.

### Consider the Model in Use
If persistent issues occur, sometimes switching to a different, more suited model like the Nova-2 might yield better results with numeric inputs.

## Conclusion
Ensuring that short numeric inputs are captured effectively by Deepgram may require tweaking various parameters like `no_delay`, employing endpoint configurations, or disabling certain formatting options. Consistent troubleshooting and adapting these configurations to fit your stream environment will improve the accuracy and responsiveness of numeric input transcriptions.

In the event the challenge persists or if the behavior appears inconsistent, do not hesitate to seek assistance. Reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram

## References
- [Smart Format - Deepgram Documentation](https://developers.deepgram.com/docs/smart-format#using-no-delay)