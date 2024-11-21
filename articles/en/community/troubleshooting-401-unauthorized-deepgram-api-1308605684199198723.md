# Troubleshooting 401 Unauthorized Error in Deepgram API

When using the Deepgram API to transcribe prerecorded audio, you may encounter a `REMOTE_CONTENT_ERROR` with an `err_msg` of "The remote server hosting the media returned a client error: 401 Unauthorized." This error indicates that Deepgram encountered an authentication issue when trying to access media from a remote server.

## Understanding the 401 Unauthorized Error

The HTTP 401 Unauthorized status code means that the request to the remote server was not properly authenticated. This could be due to several reasons:

1. The URL you've provided to Deepgram requires authentication, but correct authorization credentials were not included in the request.
2. The credentials provided (if any) were incorrect or have expired.
3. The remote server is configured to deny access to the media file for some reason.

## Steps to Resolve the 401 Error

### 1. Ensure Public Accessibility
Ensure that the URL you're providing to Deepgram is publicly accessible and doesn’t require authentication to be accessed. If the media file requires authentication, you may need to consider either downloading the file first and then submitting it directly to Deepgram or adjusting your server settings to allow temporary public access.

### 2. Verify URL and Permissions
Double-check that the URL is correct and you have the necessary permissions to access the media. Make sure that no typos exist in the URL and that the file is accessible through a regular web browser with no login required.

### 3. Authentication Mechanism
If the media requires authentication and cannot be made public, ensure that you're using the appropriate mechanism to authenticate your requests. You may have to adjust your server configuration to allow Deepgram’s IP addresses to access the server directly.

### 4. Review Remote Server Settings
Consider checking the settings of the remote server hosting the media. Ensure it is configured to serve the expected HTTP headers and response codes.

For further assistance, you can reach out to our [GitHub Discussions](https://github.com/orgs/deepgram/discussions) or join our [Discord community](https://discord.gg/deepgram), where our community and support team can provide additional help.

## Conclusion
Dealing with remote content errors often requires a keen eye for server details and proper authentication handling. By following the steps above, you can work towards resolving the 401 Unauthorized error effectively.

---

### References

- [Deepgram API Errors documentation](https://developers.deepgram.com/reference/errors#400-failure-to-fetch-remote-text-from-url)
