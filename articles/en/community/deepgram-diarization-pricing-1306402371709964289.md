# Deepgram Diarization Pricing

Deepgram's pronunciation and diarization features are included as part of its transcription service without any additional charges. Users might wonder about the cost implications of using advanced features like diarization, smart formatting, or deep search; however, these capabilities are built into the framework of Deepgram's usage-based pricing model and do not incur extra fees beyond the usual API request costs.

## Understanding Diarization in Deepgram

Diarization in Deepgram allows for the identification and separation of different speakers in an audio file. This feature is particularly useful in multi-speaker environments like meetings, interviews, or customer service calls, where distinguishing between different speakers is essential for accuracy in transcription.

### Enabling Diarization

To enable diarization, simply set the `diarize` parameter to true in your API request. This can be done across all SDKs offered by Deepgram:

#### Python Example
```python
import deepgram_sdk

deepgram = deepgram_sdk.Deepgram('YOUR_API_KEY')
options = {"diarize": True}
response = deepgram.transcription('path_to_audio_file', options)
```

#### JavaScript/Node Example
```javascript
const { Deepgram } = require('@deepgram/sdk');

const deepgram = new Deepgram('YOUR_API_KEY');
const options = { diarize: true };
const response = await deepgram.transcription.transcribe('path_to_audio_file', options);
```

#### .NET Example
```csharp
DeepgramSDK deepgram = new DeepgramSDK("YOUR_API_KEY");
var options = new TranscriptionOptions { Diarize = true };
var response = await deepgram.TranscribeAsync("path_to_audio_file", options);
```

#### Go Example
```go
import "github.com/deepgram/deepgram-go"

deepgram := deepgram.New("YOUR_API_KEY")
options := deepgram.TranscriptionOptions{Diarize: true}
response, _ := deepgram.Transcribe("path_to_audio_file", options)
```

#### Rust Example
```rust
use deepgram_sdk::{Deepgram, TranscriptionOptions};

let deepgram = Deepgram::new("YOUR_API_KEY");
let options = TranscriptionOptions { diarize: true, ..Default::default() };
let response = deepgram.transcribe("path_to_audio_file", &options).await;
```

## Conclusion

While these advanced features like diarization do not incur additional costs, utilizing them effectively depends on your specific use cases. They provide significant value in scenarios requiring detailed speaker identification and separation.

### Additional Resources:
- [Deepgram Pricing](https://deepgram.com/pricing)
- [Deepgram Transcription API](https://developers.deepgram.com/docs/getting-started-with-pre-recorded-audio)
- [GitHub SDKs](https://github.com/orgs/deepgram)
