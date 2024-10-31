# Managing Short-Lived API Keys in Deepgram

Managing API keys efficiently is crucial for establishing secure and effective connections to Deepgram's speech-to-text API. Implementing short-lived API keys is a robust method to enhance security, particularly for in-browser applications. This article will guide you through key considerations when using short-lived API keys.

## Understanding API Key Management

When designing your system to handle short-lived API keys, it's essential to consider the lifecycle of these keys — from creation, active use, to deletion. Here's a basic run-through of the actions:

1. **Creating API Keys**: Generate API keys for user sessions and associate them with user profiles to track usage.
2. **Using API Keys**: Establish a secure connection using the API key. Ensure API keys are never exposed in client-side code.
3. **Deleting API Keys**: After successfully establishing a connection, delete the API key to prevent unauthorized reuse.

### Additional Considerations:

- **Tracking Usage**: By associating API keys with users, you can monitor and detect any suspicious activity.
- **Setting Expiration**: Assign a short expiration to API keys (e.g., 10 seconds) to limit potential misuse.
- **Rate Limiting**: Implement rate limiting to safeguard against abuse of API calls.

## Implementation Across SDKs

Here's a basic example of how to manage API keys using different Deepgram SDKs. Ensure you handle API key creation and deletion securely within server-side logic, possibly coordinating with a back-end

### Python

```python
import deepgram_sdk

# Create an instance of the Deepgram client
client = deepgram_sdk.Client()
api_key = client.create_api_key(expiry='10s')

def establish_and_cleanup_connection():
    # Establish your connection
    # ...

    # Delete API key
    client.delete_api_key(api_key.id)
```

### JavaScript/Node.js

```javascript
const { Deepgram } = require('@deepgram/sdk');

const deepgram = new Deepgram('your_deepgram_api_key');

async function setupConnection() {
    const apiKey = await deepgram.createApiKey({expiry: '10s'});
    // Establish connection
    // ...

    // Delete API Key
    await deepgram.deleteApiKey(apiKey.id);
}
```

### .NET

```csharp
using Deepgram;

var deepgramClient = new DeepgramClient();
var apiKey = await deepgramClient.CreateApiKeyAsync(expiry: "10s");

// Establish connection

await deepgramClient.DeleteApiKeyAsync(apiKey.Id);
```

### Go

```go
import "deepgram-sdk-go"

deepgram := deepgram.NewClient()
apiKey, _ := deepgram.CreateApiKey("10s")

// Establish connection

_ = deepgram.DeleteApiKey(apiKey.Id)
```

### Rust

```rust
use deepgram_sdk::Deepgram;

let deepgram = Deepgram::new();
let api_key = deepgram.create_api_key("10s").await.unwrap();

// Establish connection

deepgram.delete_api_key(api_key.id).await.unwrap();
```

## Conclusion

By implementing short-lived keys with these considerations, you can maintain a secure connection environment for your Deepgram integrations. Remember, owing to no automatic expiration policy in Deepgram, manual cleanup is crucial.

## References
- [Deepgram SDK Documentation](https://developers.deepgram.com/docs/getting-started-with-pre-recorded-audio)
- [Deepgram API Management](https://developers.deepgram.com/docs/security)