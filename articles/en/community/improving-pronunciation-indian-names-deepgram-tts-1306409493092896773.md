# Improving Pronunciation of Indian Names with Deepgram TTS

When using text-to-speech (TTS) models, accurate pronunciation of names can be a frequent challenge, particularly for names that aren't common in the model’s primary language. For example, pronunciation of Indian names like Prasanna, Mangesh, and Anil may be difficult for TTS models designed primarily for US-English speakers.

### Understanding the Limitation

Currently, Deepgram's TTS models are focused on US-English, which can lead to less-than-ideal pronunciation of non-English names or names not common in the US-English lexicon. However, plans are in place to enhance pronunciation support, allowing these models to handle a much wider variety of pronunciations more effectively in future updates.

### Temporary Solutions

Until these improvements are rolled out, there are several strategies you could try to improve pronunciation using our existing features:

1. **Customized Phonetic Spelling**: You can manually adjust the spelling of words to reflect their phonetic pronunciation more accurately. This involves spelling out names phonetically in the text you provide to the TTS service.

2. **Using Tips and Tricks from Deepgram**: Deepgram provides documentation for TTS prompting that can offer guidance on how to get better pronunciation by adjusting text inputs: [Text-to-Speech Prompting](https://developers.deepgram.com/docs/text-to-speech-prompting#pronunciation).

### Example Implementations in SDKs

Here are examples of how you might adjust phonetic spelling in several Deepgram SDKs:

#### Python SDK
```python
# Example if using Python SDK for TTS
text_to_speak = "spell phonetically"
tts_client.synthesize_voice(text_to_speak)
```

#### Node.js SDK
```javascript
// Example if using Node.js SDK for TTS
const textToSpeak = "spell phonetically";
ttsClient.synthesizeVoice(textToSpeak);
```

#### .NET SDK
```csharp
// Example if using .NET SDK for TTS
var textToSpeak = "spell phonetically";
ttsClient.SynthesizeVoice(textToSpeak);
```

#### Rust SDK
```rust
// Example in Rust SDK
let text_to_speak = "spell phonetically";
tts_client.synthesize_voice(text_to_speak);
```

#### Go SDK
```go
// Example in Go SDK
textToSpeak := "spell phonetically"
ttsClient.SynthesizeVoice(textToSpeak)
```

### Conclusion

Addressing pronunciation issues for specific names can be challenging but can often be enhanced by using phonetic spellings and adjustments to your input text. While waiting for improved support for diverse name pronunciation in future Deepgram updates, employing these strategies can lead to more satisfying TTS output.

### References
- [Deepgram Text-to-Speech Prompting](https://developers.deepgram.com/docs/text-to-speech-prompting#pronunciation)