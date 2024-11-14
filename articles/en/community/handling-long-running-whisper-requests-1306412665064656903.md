# Handling Long-Running Whisper Requests in Deepgram API

Deepgram's Whisper requests have a built-in timeout limit of 20 minutes. If a request exceeds this time limit, a 504 response code is typically returned, indicating a timeout. However, there can be instances where requests continue processing beyond this threshold, potentially impacting subsequent requests.

### Background
Deepgram's API is designed to handle transcription operations efficiently, but tasks that exceed the expected duration might lead to restrictions or delays in processing new requests. This is usually to maintain the system's overall efficiency and resource management.

### Resolution and Best Practices
If you are experiencing requests still processing beyond 20 minutes, as in the example with request ID `6f7476fb-f286-4f2c-8a51-794a5d2980fb`, there are a few strategies and best practices you can follow:

1. **Verification of Completed Requests**: Regularly check your dashboard or logs to confirm completion status. Such checks ensure you aren't waiting unnecessarily or duplicating requests.

2. **Minimize Request Duration**: For long audio files, consider breaking them into smaller segments to avoid hitting the timeout limit and improve processing efficiency.

3. **Contact Support**: If issues persist or the system behavior seems inconsistent, reaching out for support will help to resolve these backend issues.

4. **Keep Systems Updated**: Ensure that all SDKs and libraries used for interfacing with Deepgram's API are up-to-date. Updated SDKs may offer more robust handling of long-running requests.

### Code Examples in Different SDKs
Here are quick snippets in various SDKs to handle such requests:

**Python**:
```python
import deepgram_sdk

deepgram = deepgram_sdk.Deepgram('<YOUR_API_KEY>')

response = deepgram.transcription.pre_recorded(['<AUDIO_FILE_PATH>'], {'timeout_seconds': 1200})
print(response)
```

**JavaScript/Node.js**:
```javascript
const Deepgram = require('deepgram-node-sdk');
const deepgram = new Deepgram('<YOUR_API_KEY>');

deepgram.transcription.preRecorded({
    url: '<AUDIO_FILE_PATH>',
    options: { timeout: 1200 }
}).then(response => console.log(response));
```

**C# (.NET)**:
```csharp
var deepgram = new DeepgramClient("<YOUR_API_KEY>");

var response = await deepgram.Transcription.PreRecordedAsync("<AUDIO_FILE_PATH>", new Dictionary<string, object>
{
    { "timeout", 1200 }
});

Console.WriteLine(response?.Result);
```

**Go**:
```go
package main

import (
    "context"
    "fmt"
    "github.com/deepgram/deepgram-go-sdk"
)

func main() {
    client := deepgram.NewClient("<YOUR_API_KEY>")
    response, err := client.TranscribeAudio(context.Background(), &deepgram.TranscribeOptions{
        URL: "<AUDIO_FILE_PATH>",
        Timeout: 1200,
    })

    if err != nil {
        fmt.Println(err)
    }
    fmt.Println(response)
}
```

**Rust**:
```rust
use deepgram::{Deepgram, options::PreRecordedTranscriptionOptions};

fn main() {
    let deepgram = Deepgram::new("<YOUR_API_KEY>");
    let options = PreRecordedTranscriptionOptions::builder()
        .timeout(1200)
        .build();

    let response = deepgram.transcribe_audio("<AUDIO_FILE_PATH>", options);
    println!("{:?}", response);
}
```

### Conclusion
While the timeout feature is designed to maintain server efficiency, sometimes extra load or backlogs could lead to extended processing times. Monitoring request statuses, segmenting long audios, and regular communication with support are crucial in managing these situations effectively.

### References
- Deepgram API Documentation: [Getting Started](https://developers.deepgram.com/docs/getting-started)