# Opting Out of Deepgram MIP Using .NET SDK

To customize your Deepgram transcription requests and manage how your data is used, you might want to opt out of the Deepgram Model Improvement Partnership (MIP). By opting out, your data won't be used to improve Deepgram's models, but note that this comes with a price increase. Here's how you can opt out using Deepgram's .NET SDK.

## Opting Out with the .NET SDK

The `mip_opt_out` parameter is not directly visible in the `PreRecordedSchema` in Deepgram's SDKs including .NET. However, you can pass it as a custom parameter when making an API request.

### Things to Consider

- **Price Adjustment**: Opting out leads to a price adjustment. You can verify this by checking the usage log for the transcription. 
- **Updated Documentation**: Ensure that you're using the latest version of the SDK and consult the updated documentation for `.NET` found here: [Deepgram SDK Docs](https://developers.deepgram.com/docs/using-custom-parameters-sdks#net-sdk)

## Conclusion
By using the custom parameter feature in the Deepgram .NET SDK, you can easily opt out of data sharing in Deepgram's Model Improvement Partnership. Always ensure you stay informed about changes to service terms or pricing associated with opting out. This approach allows you to retain control over how your data is used while leveraging Deepgram's transcription capabilities.

## References
- [Deepgram Model Improvement Partnership](https://developers.deepgram.com/docs/the-deepgram-model-improvement-partnership-program) 
- [Deepgram .NET SDK Documentation](https://developers.deepgram.com/docs/using-custom-parameters-sdks#net-sdk)