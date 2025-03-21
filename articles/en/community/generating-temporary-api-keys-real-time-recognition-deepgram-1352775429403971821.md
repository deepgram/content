# Generating Temporary API Keys for Real-Time Recognition with Deepgram

When working with Deepgram's API, generating a temporary API key for real-time speech recognition can be useful for securing client-server interactions without exposing primary keys.

## Generating Temporary API Keys

To generate a temporary API key, it's important to use the appropriate method in the Deepgram SDK. The method should handle authentication and provide the necessary permissions for the intended operation. Each key should have a specified time-to-live (TTL) and the required scopes that match the actions the key is meant to perform.

For example, using the Deepgram JavaScript SDK, an API key can be generated with restricted scopes:

```javascript
const deepgram = createClient(deepgramApiKey);

(async () => {
  const result = await deepgram.manage.createProjectKey(projectId, {
    comment: "Temporary client key",
    scopes: ["usage:write"], // Define only necessary scopes
    time_to_live_in_seconds: 300 // Key is valid for 5 minutes
  });

  if (result.error) {
    console.error("Error generating temporary token:", result.error);
    // Handle error appropriately or log for debugging
  } else {
    console.log("Generated temporary token:", result.result);
    // Use the temporary token as needed
  }
})();
```

### Troubleshooting

If you encounter a `DeepgramApiError` stating that your account does not have the required scope to perform an action:

- **Check Permissions:** Ensure your main API token has the required permissions and that you have the appropriate access rights for the project.
- **Review API Scope:** Double-check that the desired scopes you are requesting (such as `usage:write`) align with your activity.
- **Project Configuration:** Confirm that the project ID is accurate and that you are targeting the correct project setup on Deepgram's portal.
- **Error Handling:** Use detailed error handling in your SDK implementation to catch permission issues effectively.

### Additional Resources

- [JavaScript/TypeScript SDK GitHub Repository](https://github.com/deepgram/deepgram-js-sdk)
- [Deepgram API Documentation](https://developers.deepgram.com/docs/overview)

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [Deepgram Community on Discord](https://discord.gg/deepgram)

## Conclusion

By generating temporary tokens with appropriate scopes and TTL, you can safeguard your real-time speech recognition sessions while maintaining flexibility. Ensure to handle any potential errors gracefully and confirm that your SDK setup aligns with project requirements and API capabilities.
