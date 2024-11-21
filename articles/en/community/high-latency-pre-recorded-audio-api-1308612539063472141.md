# Troubleshooting High Latency with Deepgram Pre-Recorded Audio API

Experiencing high latency when using the Deepgram Pre-Recorded Audio API can impact the efficiency and performance of your applications. Typically, audio transcriptions that take just a few seconds can extend to much longer durations in cases of latency issues. While isolated latency episodes may occasionally occur, it is vital to ensure that the issue is external and not due to misconfiguration or other local factors.

## Common Causes of Latency

1. **Network Issues:** Slow or unstable internet connections can affect the speed at which audio data is transmitted to Deepgram's servers. Ensure your internet connection is robust and stable.

2. **Server-Side Issues:** Sometimes, server-side issues can lead to increased latency. Deepgram provides a [Status Page] (https://status.deepgram.com/#) where you can check for any ongoing server issues or maintenance that might be impacting latency.

3. **Large Audio Files:** If the audio files being processed are unusually large, it can take longer to process them. Consider breaking large files into smaller chunks if possible.

4. **Variable Server Load:** During periods of high demand, response times may increase. However, Deepgram is designed to handle high volumes and typically balances loads effectively.

5. **Incorrect API Usage:** Confirm that you are using the API endpoints correctly and sending requests with properly formatted data.

## Best Practices for Mitigating Latency

- **Monitor Deepgram Status:** Regularly check the status page for updates on any known issues that could affect your service performance.
- **Optimize Your Usage:** Streamline your requests to the essential data needed for transcription and minimize the payload size when possible.
- **Contact Support:** If you consistently experience high latency or encounter issues not covered by the above causes, consider reaching out through our [Discord](https://discord.gg/deepgram) or [GitHub Discussions](https://github.com/orgs/deepgram/discussions) for assistance.


By understanding these potential factors, you can work towards minimizing API latency and maintaining efficient transcription processes. 

### Conclusion

Effective handling of latency issues involves a combination of proactive monitoring, proper configuration, and utilizing available resources for support. By following best practices and staying informed about server statuses, the impact of latency can be significantly reduced.

For continued support or to address ongoing latency concerns, please visit our [Discord](https://discord.gg/deepgram) and [GitHub Discussions](https://github.com/orgs/deepgram/discussions).

### References:
- [Deepgram Status Page](https://status.deepgram.com/#)
- [Discord](https://discord.gg/deepgram)
- [GitHub Discussions](https://github.com/orgs/deepgram/discussions)