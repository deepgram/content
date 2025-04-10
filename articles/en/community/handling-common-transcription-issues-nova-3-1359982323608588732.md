# Handling common transcription issues in Deepgram's Nova-3

In Deepgram's Nova-3 model, particularly with its medical and smart format features, users may encounter specific transcription issues where certain letters are misinterpreted. For instance, instances have been noted where the letter 'o' is transcribed as the digit '0'. While this is a known issue being addressed by Deepgram's Engineering Team, there are interim solutions that users can implement to mitigate such errors. 

## Addressing Transcription Inaccuracies

When using Deepgram's Nova-3 model, certain inaccuracies might occur due to the nature of audio processing. This is especially prevalent when dealing with proper nouns or particular phonetic pronunciations that the model may interpret incorrectly. In these scenarios, utilizing Deepgram's powerful **Keyterms** feature can significantly aid in improving the model's focus and accuracy on specific words.

### Using Keyterms for Better Accuracy

Deepgram allows users to specify keyterms in their API call to "boost" words during the transcription process, ensuring that certain terms, such as proper nouns, are transcribed more accurately.

- **Keyterms Boosting:** This feature enables users to highlight specific words or phrases, forcing the model to place additional emphasis on them. This can be particularly useful in contexts where precise transcription of unique names or terminologies is critical.

For more on how to use Keyterms, visit the [Deepgram documentation](https://developers.deepgram.com/docs/keyterm).

## Conclusion

Although transcription errors can occur due to the complex nature of audio processing, tools like Keyterms provide a practical means of ensuring greater accuracy, particularly with specialized vocabulary. If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [Deepgram Community](https://discord.gg/deepgram)

## References

For additional details and instructions, refer to the Deepgram documentation:
- [Keyterms Documentation](https://developers.deepgram.com/docs/keyterm)

If any unusual issues continue that are not resolved using available tools and settings, contact Deepgram support or visit the [Deepgram Community](https://discord.gg/deepgram).