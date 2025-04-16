# Deepgram Summarization Word Count Requirements

When using Deepgram's summarization feature, it's important to note that there are specific requirements regarding the length of the input transcripts for effective summary generation. 

## Understanding Summarization Thresholds

To prevent instances of the generated summary being identical to the original transcript, Deepgram has implemented a minimum word count requirement. For inputs shorter than 50 words, the system will default to returning the original transcript as the summary. This approach was adopted to address potential hallucinations in summaries for very short inputs where meaningful summarization is not feasible.

### How the Threshold Impacts Billing

When the summarization feature processes transcripts shorter than the minimum threshold of 50 words, the original text will be returned without incurring any billing for summarization since no summary generation takes place.

## Recommendations for Users

To utilize the summarization feature effectively, it's recommended to input transcripts longer than 50 words. This ensures that the system can sufficiently analyze and generate an appropriate summary that differs from the original transcript.

### Improving Summary Quality

1. **Input Length**: Ensure that the input transcript is longer than 50 words.
2. **Structure and Complexity**: While there is no specific complexity requirement, providing well-structured sentences can enhance summarization quality.

## Conclusion

In summary, the Deepgram summarization feature requires transcript inputs to be more than 50 words for effective summary generation. This threshold helps prevent identical summaries and avoids billing for summary generation of short transcripts.

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram.

## References

- [Community Discussion on Deepgram Summarization](https://discord.gg/deepgram)