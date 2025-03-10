# Managing Logging in Deepgram .NET SDK

When using the Deepgram .NET SDK in your project, you might encounter a situation where log files are automatically generated in your program's folder. These files typically contain SDK configuration and connection logs, which may not always be relevant for every application deployment.

To address this, you can manage the logging behavior by looking into the source code of the SDK, specifically focusing on the logging configuration. This is helpful if you wish to disable or redirect these logs according to your project needs.

### Configure Logging

The logging functionality within the Deepgram .NET SDK can usually be configured or disabled through modifications in the SDK's source code. As with many SDKs, the log output is prominently managed in a central logger class file.

In the source code repository, locate the relevant file and line that handles the log configuration. Here is an example path you can check where such configurations could typically reside:

```
https://github.com/deepgram/deepgram-dotnet-sdk/blob/138ce74711ea547aa1174832dfff0ed621714c9b/Deepgram/Logger/Log.cs#L34
```

### Adjusting the Logger

Once you locate the logger setup, investigate the usage of logger objects and methods. Consider how the existing logging might be redirected to a different sink or completely disabled if your application doesn't require these logs.

### Key Considerations

- Ensure that by disabling logs, no critical information flow required for troubleshooting or development is impacted.
- Examine if setting up a configuration file or environment variable can manage or redefine logging according to your deployment environment, which is often a preferred method over code changes.

### Conclusion

If you need further assistance regarding logging configurations or more in-depth modifications in the SDK, reach out to your Deepgram support representative or visit our community: [Deepgram Community on Discord](https://discord.gg/deepgram)

### References:
- [Deepgram .NET SDK Repository](https://github.com/deepgram/deepgram-dotnet-sdk)
