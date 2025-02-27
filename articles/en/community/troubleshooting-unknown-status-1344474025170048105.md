# Troubleshooting Unknown Status in Deepgram API Requests

When using Deepgram's API, occasionally you might encounter requests leading to an 'Unknown' status. Understanding and resolving these instances is pivotal to maintaining a seamless workflow and ensuring your API calls are performing as expected.

## Understanding the Unknown Status

In Deepgram's usage logs, requests that end up in an 'Unknown' status indicate that the system could not successfully process them. It's important to note that sometimes these logs might eventually turn into a 'Success' once the system processes them further. However, continuous occurrences of this status might require further investigation.

For details about different log states and their meanings, you can consult [Deepgram's documentation on console usage log states](https://developers.deepgram.com/docs/using-logs-usage#understanding--console-usage-log-states).

## Common Causes of Unknown Status

One of the common issues leading to an 'Unknown' status is sending invalid audio data. This could be an empty file or an improperly formatted audio file. Verifying the content you are sending is a critical step:

- **Check the audio data**: Ensure the audio files are not empty and are in a supported format.
- **Validate successful requests**: Compare the audio data of successful requests to those resulting in 'Unknown' status to determine discrepancies.

## Request Parameter Recommendations

When configuring your requests, consider the following:

- **Parameter Spelling**: Ensure that you use correct query parameters. For example, use `paragraphs` (with an 's') and not `paragraph`.
- **Smart Formatting**: If using smart formatting features, note that you do not need to explicitly include `paragraphs` or `punctuate` parameters if `smart_format` is set to true. For more information, visit [Deepgram's Smart Format documentation](https://developers.deepgram.com/docs/smart-format).

## Conclusion

By ensuring your audio files are valid and correctly formatted, and your request parameters are accurately set, you can minimize instances of 'Unknown' status in Deepgram API requests. 

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [https://discord.gg/deepgram](https://discord.gg/deepgram).

---

### References
- [Using Logs & Usage](https://developers.deepgram.com/docs/using-logs-usage#understanding--console-usage-log-states)
- [Smart Format](https://developers.deepgram.com/docs/smart-format)