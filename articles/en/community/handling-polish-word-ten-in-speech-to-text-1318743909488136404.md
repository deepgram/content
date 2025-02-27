# Handling Polish Word 'Ten' in Speech-to-Text Services

In Polish speech-to-text (STT) services, recognizing the word 'ten' can present challenges as it phonetically aligns with the English word for the number 10. This often leads to incorrect transcriptions where the word 'ten' is mistakenly rendered as the number "10". 

### Understanding the Issue

In Polish, the word "ten" often translates to "this" and is commonly used in conversation. However, due to its phonetic similarity to the English number "ten", speech-to-text services may mistakenly interpret it numerically instead of contextually. Polish conventions generally dictate that numeric values are transcribed in their written form rather than as numerals unless context explicitly suggests otherwise.

For example, when a speaker says "ten" twice in a row, the system might incorrectly output "10:10" instead of recognizing it as the Polish word. This can cause confusion, especially in contexts where the word "this" is contextually more appropriate.

### Improving Accuracy

To address this, consider these strategies:

- **Post-Processing Scripts:** Implement scripts to identify when "10" appears without surrounding sentences indicating numeric context. These scripts can automatically convert "10" to "ten" based on the linguistic context.

- **Custom Models and Training:** Leveraging custom models by providing specific training data can help improve accurate recognition of context-specific words like "ten". Engage with Deepgram's customization options to enhance model performance for Polish language nuances.

### Conclusion

While automatic speech recognition systems continue to improve, certain linguistic nuances like homophones can create challenges. By integrating post-processing solutions or exploring model customization, you can help improve the transcription accuracy of critical words like "ten".

For further assistance in managing such linguistic challenges, or if issues persist, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [Deepgram Discord Community](https://discord.gg/deepgram)

### References

- [Deepgram's Transcription API Documentation](https://developers.deepgram.com/docs/getting-started-with-pre-recorded-audio)
- [Community Discussions on Polish Speech Recognition](https://github.com/orgs/deepgram/discussions)
- [Forum Feedback and Language Model Enhancement](https://community.deepgram.com)