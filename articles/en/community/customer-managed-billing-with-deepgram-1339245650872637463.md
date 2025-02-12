# Implementing Customer-Managed Billing with Deepgram API

When building a voice agent or similar applications that utilize the Deepgram API, managing and distributing usage costs effectively can be a challenge. In many cases, you want your customers to directly incur the costs of using Deepgram's services rather than absorbing these costs yourself. This guide outlines how to implement a customer-managed billing system using Deepgram’s capabilities.

## Lede

Outsourcing the cost of API usage to customers allows third-party apps to provide services without incurring variable costs. This system lets customers pay directly for the services they use, maintaining transparency and control over their usage.

## Creating Multiple API Keys

Deepgram allows you to create multiple API keys within a single project. This feature helps you manage usage across different customers:

1. **Generate Unique API Keys**: Create separate API keys for each customer within your project, enabling you to track and manage their usage individually.
2. **Implementation**: Use these keys in your application, associating each one with a different customer account.
3. **Billing and Reporting**: Use Deepgram’s monitoring tools to track each key’s usage and determine costs.

## Structuring Customer Billing

To successfully pass on the costs to the customer without direct API billing support, follow these steps:

- **Usage Tracking**: Monitor each customer's API key usage using Deepgram’s available tools.
- **Cost Calculation**: Calculate the cost based on usage and integrate this into your internal billing system.
- **Invoice Customers**: Regularly invoice your customers based on the usage data collected.

## Future Enhancement Ideas

While direct customer billing via authorization models like OIDC is not currently available, the capability for diverse account usage and billing structures can significantly streamline operations. Taking inspiration from models like Google Drive, it would be ideal for customers to authorize apps to manage their own Deepgram accounts, thus separating service costs and app subscription fees.

## Conclusion

By leveraging Deepgram's ability to create multiple API keys, you can efficiently manage customer billing and streamline billing processes. While direct customer billing through Deepgram is not available, using multiple API keys provides a feasible workaround.

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram

## References

- [Deepgram API Documentation](https://developers.deepgram.com/docs/api)
- [Deepgram Community on Discord](https://discord.gg/deepgram)

Remember, managing API costs effectively ensures that you can provide seamless services to your clients without incurring unexpected expenses.