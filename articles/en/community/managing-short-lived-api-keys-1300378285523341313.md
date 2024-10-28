# Managing Short-Lived API Keys for Secure Speech-to-Text Implementations

When implementing in-browser speech-to-text using API keys, it is crucial to manage these keys effectively, particularly if they are short-lived. Unlike traditional long-term keys, short-lived keys offer enhanced security by limiting the time a key is valid, reducing the window of opportunity for misuse. However, this leads to challenges in managing the lifecycle of these keys.

## Key Considerations

1. **Unlimited Key Creation**: Rest assured, there are no caps on the number of API keys you can create in your Deepgram project. This means you can generate as many short-lived keys as needed without worrying about hitting a limit.

2. **Key Deletion Practices**: While there's no automatic policy to purge expired keys, it’s good practice to delete keys once their lifecycle ends or when they’re no longer in use. This can help keep your records clean and reduce potential security holes.

3. **Immediate Key Deletion**: For additional security, consider deleting API keys immediately after establishing a connection. This ensures that even if a key is intercepted after use, it cannot be exploited.

4. **Auth and Monitoring**: Always ensure that your keys, especially when used in client-side applications, are accessed only through a secure authentication mechanism. Recording which API key was created for each user session can help you track potential misuse. If suspicious activity is detected, you can trace back which key was used and take appropriate action.

## Example: Managing Keys in Different SDKs
Here's how you might create a short-lived key and delete it in various SDK environments:

### Python
```python
import deepgram_sdk

client = deepgram_sdk.Client(api_key="YOUR_SUPER_SECRET_API_KEY")
# Create key, use it, then delete it
key_id = client.create_key(user_id="123456")
# after use
client.delete_key(key_id)
```

### JavaScript/Node
```javascript
const deepgram_sdk = require('deepgram-sdk');
const client = new deepgram_sdk.Client("YOUR_SUPER_SECRET_API_KEY");
// Create key, use it, then delete it
const keyId = client.createKey({ userId: "123456" });
// after use
client.deleteKey(keyId);
```

### .NET
```csharp
using Deepgram;
var client = new DeepgramClient("YOUR_SUPER_SECRET_API_KEY");
var keyId = client.CreateKey("123456");
// after use
client.DeleteKey(keyId);
```

### Rust
```rust
use deepgram;
let client = deepgram::Client::new("YOUR_SUPER_SECRET_API_KEY");
let key_id = client.create_key("123456");
client.delete_key(key_id);
```

### Go
```go
package main

import "github.com/deepgram/deepgram-go"

func main() {
    client := deepgram.NewClient("YOUR_SUPER_SECRET_API_KEY")
    keyId := client.CreateKey("123456")
    // after use
    client.DeleteKey(keyId)
}
```

## Conclusion
Effective management of short-lived API keys ensures both security and flexibility in deploying speech-to-text technology in client-side applications. Always monitor usage and enforce strict authentication to mitigate risks.

### References
- [Deepgram API documentation](https://developers.deepgram.com)
- [GitHub Discussions](https://github.com/orgs/deepgram/discussions)
- [Deepgram SDKs](https://github.com/deepgram)