# Understanding Keyterms vs Keywords in Deepgram

In the Deepgram ecosystem, **Keyterms** and **Keywords** help enhance the accuracy of transcriptions by focusing on terms audio models may struggle with. However, they are distinct features supported by different models and cater to differing use-cases.

### Differences Between Keyterms and Keywords

**Keyterms:**
- **Model Support:** Exclusively available in the Nova-3 model. 
- **Multi-word Support:** Capable of recognizing and accurately transcribing both individual words and multi-word phrases.
- **Vocabulary Inclusion:** Works with both in-vocabulary and out-of-vocabulary terms.
- **Accuracy:** Delivers a higher keyword recognition rate compared to Keywords.

**Keywords:**
- **Model Support:** Used with Nova-2 and older models.
- **Single-word Focus:** Primarily boosts individual uncommon words that aren't recognized correctly by the model.
- **Out-of-vocabulary Emphasis:** Keywords focuses on improving transcription accuracy for words not previously or successfully transcribed by the model.

### Best Practices

When working with **Keywords**, adhere to the following guidelines:
- **Target Uncommon Words:** Boost words that the model struggles with. Avoid boosting common words or alphanumeric sequences.
- **Limit Submission:** Submit each word once to avoid redundancy in processing.
- **Focus on Principal Words**: Submit key parts of phrases rather than full phrases for more accurate emphasis.

For **Keyterms**, given their multi-word and broader vocabulary support, users can focus more on complete terminology that needs improved recognition, both familiar and unfamiliar to the model.

### Conclusion
Understanding the nuances between these features allows developers to leverage Deepgram's transcription capabilities more effectively. With improved recognition rates and broader support, adopting Keyterms with Nova-3 equips users with advanced transcription accuracy.

For detailed guidance on utilizing these features, refer to the [Deepgram Developers Documentation for Keyterms](https://developers.deepgram.com/docs/keyterm) and [Keywords](https://developers.deepgram.com/docs/keywords).

---

**References:**
- [Keyterm Documentation](https://developers.deepgram.com/docs/keyterm)
- [Keyword Documentation](https://developers.deepgram.com/docs/keywords)

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram