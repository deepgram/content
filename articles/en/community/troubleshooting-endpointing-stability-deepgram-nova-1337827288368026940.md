# Troubleshooting Endpointing and Stability Issues in Deepgram Nova Transcription Models

In some scenarios, users may experience erratic endpointing behavior and instability when using Deepgram's nova transcription models, especially with multilingual audio settings or specific configurations in live transcription via websockets. 

Multilingual transcription, while powerful, can introduce complexity and issues with endpointing—when the system identifies the end of a sentence or utterance. Unstable endpointing can lead to repeated non-final responses or lack of utterance end markers, disrupting the flow of a transcription service or application.

## Common Issues and Configuration Recommendations

### Erratic Endpointing
Some users may notice intermittent errors in endpointing where transcriptions continue without finalizing (`is_final: false`), potentially repeating transcriptions multiple times with false non-final indicators.

#### Configuration Parameters:
- **Model Version:** Switching model versions (`nova-2`, `nova-3`, `nova-2-conversationalai`) may help, as each version may handle language settings differently.
- **Language Settings:** Using `language=es` instead of `language=multi`, if applicable to your audience, can sometimes rectify these issues.
- **Endpointing and Interim Results:** Adjusting `endpointing` and `utterance_end_ms` parameters can stabilize outputs. 
    - Default value changes may be beneficial when switching from `nova-2` to newer models. Consider starting with `endpointing=300` and `utterance_end_ms=1200` as a baseline.

### Streaming Instability
Some users may experience rare instances where the stream fails to respond or becomes unstable. This could be due to complex audio inputs or server-side anomalies.

#### Actions to Consider:
- **API Request Monitoring:** Check for response codes or lack of metadata packets which might indicate failures.
- **Review API Configurations:** Ensure that complex settings like `diarize` or multiple keywords aren't conflicting with the model's capabilities or limitations.

### Recommendations
- **Troubleshoot with Different Endpoint Values:** Trial and error with endpoint and utterance parameters could uncover specific values that offer stability in your scenario.
- **Engage with Deepgram Support:** Persistent or unexplained issues should be brought to support representatives or via our community channels for more tailored assistance. You can reach us at our [Discord community](https://discord.gg/deepgram).

## Conclusion
Users may encounter unique challenges when configuring Deepgram's transcription models to handle diverse and multilingual audio streams. Adjusting API parameters, keeping track of model versions, and seeking support can provide pathways to resolving complex endpointing and stability issues.

## References
- [Deepgram Multilingual Code Switching Documentation](https://developers.deepgram.com/docs/multilingual-code-switching#streaming-audio)
- [Deepgram Endpointing and Interim Results Documentation](https://developers.deepgram.com/docs/understand-endpointing-interim-results)
- [Join Our Deepgram Community on Discord](https://discord.gg/deepgram)