# Enhancing Transcription with Punctuation and Manageable Audio Input Speed

To deliver the best transcription services, it's essential to address two common issues that may arise: the absence of punctuation in transcriptions and optimizing audio input speed for automatic speech recognition. To help you improve the user experience, let's explore some techniques to handle these scenarios effectively.

## Enabling Punctuation in Transcription

Deepgram's Dictation feature can transform spoken dictation commands into punctuation marks, enhancing the readability of transcriptions. To leverage this feature:

- Enable the `dictation` parameter by setting it to `true` in your API request.
- Ensure the `punctuate` parameter is enabled for dictation to operate correctly.

For example, to use these parameters in an API request, you could:

```bash
curl \
  --request POST \
  --header 'Authorization: Token YOUR_DEEPGRAM_API_KEY' \
  --header 'Content-Type: audio/wav' \
  --data-binary @youraudio.wav \
  --url 'https://api.deepgram.com/v1/listen?dictation=true&punctuate=true'
```

This setup ensures that punctuation appears naturally in the transcribed text, providing clarity and improving the overall readability.

## Managing Audio Input Speed

Addressing the speed at which audio is processed is crucial for accurate recognition. If your transcriptions are coming through too quickly, consider:

- Verifying the compatibility of your audio input rate with Deepgram's requirements.
- Adjusting the audio input rate if necessary, to ensure that the automatic speech recognition processes at the correct speed.

By ensuring the appropriate rate, you can enhance the recognition performance, making the transcription service more reliable and efficient.

## Implementation and Support

If you're not familiar with the technical aspects, collaborating with developers is an excellent approach to implementing these solutions effectively. However, if you need further assistance, don't hesitate to join discussions on our [Discord](https://discord.gg/deepgram) or [GitHub Discussions](https://github.com/orgs/deepgram/discussions). Our community and support channels are always available to help.

### Conclusion

By enabling features such as `dictation` and `punctuate`, and ensuring a manageable audio input rate, you can significantly improve the transcription quality. Experimenting and collaborating with tech partners will further refine the process, ensuring a premium user experience.

For more insights and continuous support, visit our community platforms:
- [Discord Community](https://discord.gg/deepgram)
- [GitHub Discussions](https://github.com/orgs/deepgram/discussions)