# Understanding Deepgram Credit Balance Retrieval Options

Deepgram allows users to retrieve their current credit balance through API endpoints specifically designed for this purpose. Understanding how to utilize these endpoints can help in managing and tracking your usage effectively.

## Retrieving Credit Balances

Deepgram provides two main API endpoints to access balance information related to a project:

1. **Get All Balances**:
   - **Endpoint:** `/v1/balances`
   - **Description:** Fetches all balance details related to your project. This is useful to get an overview of all your credits.
   - **Documentation:** [Deepgram Get All Balances](https://developers.deepgram.com/reference/get-all-balances)

2. **Get Specific Balance**:
   - **Endpoint:** `/v1/balance`
   - **Description:** Retrieves the balance for a specific project, providing essential details like balance amount, units, and purchase order ID.
   - **Documentation:** [Deepgram Get Balance](https://developers.deepgram.com/reference/get-balance)

### Example Response

Upon querying these endpoints, you might receive a response structured as follows:

```json
"balances": [
    {
        "balance_id": "11111111-2222-3333-4444-555555555555",
        "amount": 104.56822227,
        "units": "usd",
        "purchase_order_id": "22222222-3333-4444-5555-666666666666"
    }
]
```

Each balance entry in the response typically includes:
- **balance_id:** A unique identifier for the balance entry.
- **amount:** The credit amount available.
- **units:** The currency unit, such as USD.
- **purchase_order_id:** A unique identifier for the purchase order linked to the balance.

## Using Deepgram SDKs for Balance Retrieval

While the above endpoints provide HTTP-based access, you can also utilize Deepgram's SDKs to seamlessly integrate balance retrieval into your applications. Deepgram offers SDKs in various languages, which you can find at:
- [JavaScript/TypeScript SDK](https://github.com/deepgram/deepgram-js-sdk)
- [Python SDK](https://github.com/deepgram/deepgram-python-sdk)
- [Go SDK](https://github.com/deepgram/deepgram-go-sdk)
- [.NET SDK](https://github.com/deepgram/deepgram-dotnet-sdk)
- [Rust SDK](https://github.com/deepgram/deepgram-rust-sdk)

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [Deepgram Discord](https://discord.gg/deepgram)

## Conclusion

Understanding these API endpoints and SDK integrations can greatly enhance your ability to manage your Deepgram usage. Should you encounter any complications or require further assistance, leveraging Deepgram's community and support resources is highly encouraged.

## References

- [Deepgram Get All Balances API](https://developers.deepgram.com/reference/get-all-balances)
- [Deepgram Get Balance API](https://developers.deepgram.com/reference/get-balance)
- [Deepgram Community Discord](https://discord.gg/deepgram)