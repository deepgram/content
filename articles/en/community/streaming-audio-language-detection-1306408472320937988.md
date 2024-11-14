# Streaming Audio Language Detection with Deepgram

Detecting and transcribing multiple languages within live audio streams is a key capability that significantly enhances user experience, particularly in diverse linguistic settings. Deepgram offers language detection and transcription for streaming audio, enabling seamless and automated recognition of different languages within the same audio source.

## Language Support and Multilingual Models

Deepgram's advanced language models, including our multilingual model, are designed to transcribe multiple languages from the same audio file. The initial multi-language capability supports English and Spanish. As we continue development, we're expanding this functionality to support more languages, such as German and French, based on prioritized demand.

### Key Features:
- **Streaming Language Detection**: Automatically identifies and transcribes multiple languages from live audio inputs without requiring separate language-specific models.
- **Multilingual Support**: Currently includes English and Spanish, with additional languages like German and French in development.

## Using the Multilingual Model

To utilize Deepgram's model capable of detecting and transcribing multiple languages, indicate your preference by setting the `model=multi` parameter when utilizing Deepgram's API.

Here are examples in various SDKs to facilitate the integration:

### Node.js
```javascript
const deepgram = require('@deepgram/sdk');
const deepgramClient = new deepgram('YOUR_API_KEY');

deepgramClient.transcription.preRecorded({
  url: 'YOUR_AUDIO_URL',
  model: 'multi',
}).then((response) => {
  console.log(response.data.transcription);
});
```

### Python
```python
from deepgram import Deepgram
import asyncio

deepgramClient = Deepgram('YOUR_API_KEY')

async def main():
    response = await deepgramClient.transcription.prerecorded({
        'url': 'YOUR_AUDIO_URL',
        'model': 'multi'
    })
    print(response['data']['transcription'])

asyncio.run(main())
```

### .NET
```csharp
using Deepgram;

var deepgramClient = new DeepgramClient("YOUR_API_KEY");
var response = await deepgramClient.Transcriptions.PrerecordedAsync(new Uri("YOUR_AUDIO_URL"), model: "multi");
Console.WriteLine(response.Transcription);
```

### Rust
Consider utilizing the [Deepgram Rust SDK documentation](https://github.com/deepgram) for full code examples.

### Go
Refer to the [Deepgram Go SDK documentation](https://github.com/deepgram) for comprehensive implementation details.

## Conclusion
Multilingual transcription and language detection for streaming audio enhances accessibility and understanding across different linguistic backgrounds. Keep an eye on Deepgram developments for expanded language support and further improvements in the multilingual model.

## References
For more information and updates about Deepgram's language detection and multilingual capabilities, visit our [developer documentation](https://developers.deepgram.com/docs), [GitHub Discussions](https://github.com/orgs/deepgram/discussions), or join our active community on [Discord](https://discord.gg/deepgram).