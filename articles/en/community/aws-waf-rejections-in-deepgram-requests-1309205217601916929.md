# Handling AWS WAF Rejections in Deepgram Requests

When utilizing Deepgram's transcription services, you may encounter challenges with requests being blocked by AWS WAF due to missing User-Agent headers. This guide provides strategies for addressing these issues and ensuring that your requests are processed smoothly.

Deepgram's API provides high-quality transcription services, and it's crucial that audio files hosted on secure servers are accessible for transcription. A common configuration with AWS Web Application Firewall (WAF) is to block requests that lack a User-Agent header, which can complicate interaction with services like Deepgram that may not send these with every type of request.

## Potential Impact

When Deepgram attempts to fetch audio resources from a provided URL, the server generates an HTTP request to retrieve the file. Some firewall settings, such as AWS WAF, might reject these requests because they lack a User-Agent header. This blockage is designed to protect against potentially harmful bot traffic.

## Addressing the Issue

Here are two recommended strategies to resolve this problem:

1. **Update AWS WAF Rules:** If possible, configure AWS WAF to allow Deepgram's requests. You might achieve this by adding a rule that permits requests from Deepgram, potentially based on the **dg-token** header or other consistent identifiers.

2. **Validate Requests:** Using features such as the **dg-token** header, you can authenticate requests coming from Deepgram. This approach allows you to confidently allow these requests without compromising security practices.

## Recommendations for Developers

Deepgram's current API setup doesn't permit sending arbitrary headers in its fetch requests for remote audio. However, custom solutions, such as modifying WAF rules, can help ensure the requests are permissible.

If you continue to face challenges, you may want to explore updating firewall rules to be more context-aware, checking specifically for Deepgram's domain or expected headers related to their services.

## Conclusion

Working with external services like Deepgram requires configuration adjustments to seamlessly integrate into your existing security infrastructure. In cases where security policies conflict with service operation – such as missing User-Agent headers in HTTP requests – adjusting security protocols can be an effective path forward.

For ongoing support or additional configurations, you are encouraged to reach out to your Deepgram support representative or engage with our community for further guidance.

---

### External Resources:
- [AWS WAF Documentation](https://docs.aws.amazon.com/waf/)
- [Deepgram's Callback Authentication Documentation](https://developers.deepgram.com/docs/callback#authenticating-callback-requests)

For further assistance, don't hesitate to reach out to Deepgram's support channels: [https://discord.gg/deepgram](https://discord.gg/deepgram)