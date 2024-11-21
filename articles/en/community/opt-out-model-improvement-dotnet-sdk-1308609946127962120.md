# Opt out of Deepgram Model Improvement Program (MIP) via Deepgram SDKs

When using Deepgram's transcription services, you might want to opt out of the Model Improvement Program (MIP) due to sensitivity reasons. Keep in mind that opting out will result in an increase in service rates.

## Using Custom Parameters in any SDK

The Deepgram SDKs allows you to pass custom parameters to tailor your API requests as needed, including opting out of optional features such as the MIP.

To use this feature, you need to include `mip_opt_out` as a custom parameter in your API call configuration. This parameter is not explicitly listed in the SDK by default but can be used via the custom parameter mechanism as provided by the SDK.

## SDK Documentation

For detailed documentation on how to add custom parameters in Deepgram SDK, refer to [Deepgram Documentation on Using Custom Parameters in SDKs](https://developers.deepgram.com/docs/using-custom-parameters-sdks).

### Confirming Opt-Out

Once you've opted out, you can verify this action by checking your usage logs. Look for a price increase that indicates the successful implementation of the `mip_opt_out` parameter.

For full insights into Deepgram's Model Improvement Program and how to manage your preferences, visit [MIP Documentation](https://developers.deepgram.com/docs/the-deepgram-model-improvement-partnership-program).

### For More Support

If you encounter issues or require further assistance, reach out to our community on [Discord](https://discord.gg/deepgram) or [GitHub Discussions](https://github.com/orgs/deepgram/discussions) where community experts and Deepgram engineers are available to help.
