# Audio Format Specifications for ElevenLabs Integration

When integrating audio services like ElevenLabs with an AI agent, it's crucial to adhere to their supported audio format specifications to ensure optimal performance. Recognizing and troubleshooting issues such as altered audio speeds can significantly improve integration outcomes.

## Audio Format Considerations

When processing audio, ensuring compatibility with the expected specifications of the ElevenLabs provider is vital. Audio issues, such as the "chipmunk" effect where audio playback is too fast, can often result from mismatched audio sample rates or incompatible formats.

### Key Parameters:

- **Sample Rate**: Ensure that the sample rate aligns with the supported range specified by ElevenLabs. In this case, setting the sample rate to 24000 Hz resolved the issue.
- **Audio Format**: Verify that the format aligns with ElevenLabs' compatibility requirements. Using Linear16 format with a sample rate of 24000 Hz is recommended. Alterations in these settings may lead to errors such as "Please choose an audio output format compatible with ElevenLabs."

### Common Troubleshooting Steps:

1. **Review Hardcoded Values**: Inspect the code for hardcoded audio settings. A fixed sample rate may inadvertently cause compatibility issues.
2. **Consult Documentation**: Always verify against official documentation or contact ElevenLabs for the most up-to-date supported specifications.
3. **Adjust and Test Incrementally**: Make incremental changes to audio settings, testing each modification to observe its impact on audio playback.
4. **Integrate with Sample Projects**: Utilize and baseline functionality against sample projects or demos provided by the community or ElevenLabs themselves. Sample projects like those from the Deepgram community provide valuable starting points for successful integration.

## Conclusion

Adhering to proper audio format specifications is crucial for seamless integration with audio services. Ensure that your solution is set up correctly by aligning your audio parameter configurations with those required by ElevenLabs. For persistent issues, collaborate with the community or contact support.

For further assistance, reach out to your Deepgram support representative or visit our [community forum](https://discord.gg/deepgram).

### References

- [ElevenLabs](#) (Link to official audio specifications or documentation if available)
- [Deepgram Community GitHub Discussions](https://github.com/orgs/deepgram/discussions)
- [Developer Docs for Audio Processing](https://developers.deepgram.com/)