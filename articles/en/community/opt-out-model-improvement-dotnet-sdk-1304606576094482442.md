# Opting Out of Model Improvement Partnership in Deepgram's .NET SDK

To opt out of the Deepgram Model Improvement Partnership (MIP) for sensitive content transcriptions using Deepgram's .NET SDK, use a custom parameter `mip_opt_out` in your API requests. Opting out may lead to higher costs, so it's essential to be aware of the impact on pricing before proceeding.

## Opting Out Using .NET SDK

The Deepgram .NET SDK does not natively include the `mip_opt_out` in the `PreRecordedSchema`. However, it allows for passing custom parameters to the API call, which you can use to set this option.

### Important Considerations:

- **Pricing Impact**: Opting out of MIP results in higher transcription costs. Ensure you verify this change through your billing or usage logs.
- **Verification**: You can confirm if the opt-out was successful by checking the price increase in the usage logs for the same transcription.

## Conclusion
Utilizing the `mip_opt_out` parameter when needed in sensitive content cases will help you manage data privacy more effectively.

For more detailed information on custom parameters in the .NET SDK, visit the [Deepgram .NET SDK documentation](https://developers.deepgram.com/docs/using-custom-parameters-sdks#net-sdk).

### References:
- [Deepgram Model Improvement Partnership Program](https://developers.deepgram.com/docs/the-deepgram-model-improvement-partnership-program)