# Configuring a Voice Agent to Initiate Conversations

When setting up a voice agent with Deepgram's Agent API, you may wish to configure it to start the conversation. This guide will outline how to configure your voice agent so that it speaks first.

To prepare the voice agent to speak first in any interaction, you will need to set up a configuration object that includes the agent's audio settings, listening and speaking models, thought process instructions, and most importantly, the initial context message that allows the agent to start the conversation.

### Configuration Setup

Here is a sample configuration that sets the voice agent to begin with a greeting:

```javascript
const config = {
  type: 'SettingsConfiguration',
  audio: {
    // audio config
  },
  agent: {
    listen: {
      model: 'nova-2',
    },
    speak: {
      model: 'aura-asteria-en',
    },
    think: {
      // model/provider selection
      instructions: 'Some instructions.',
      functions: [
        // your functions
      ],
    },
  },
  // important!
  context: {
    messages: [
      {
        content: 'Hello, how can I help you?',
        role: 'assistant',
      },
    ],
    replay: true,
  },
};
```

### Context Message
In the configuration object, the `context` field is crucial. By predefining messages in `context.messages`, you give the agent an initial message to present, setting it as the initiator of dialogues. The `replay: true` setting ensures this message is played or delivered at the start of the session.

### Implementation Breakdown
- **Audio Configuration**: Customize audio settings as required for your application (not shown in detail here).
- **Agent Models**: Choose the models for listening (`nova-2`) and speaking (`aura-asteria-en`) that best suit your use case.
- **Thought Instructions**: Provide necessary logic or instructions for the agent's reasoning or response logic work.
- **Starting Message**: Configure the agent to start with a friendly introductory message set in the `context`.

### Further Considerations
If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [Deepgram Community](https://discord.gg/deepgram)

### References
- [Agent API Documentation](https://developers.deepgram.com/docs/voice-agent)
- Join the conversation on [Deepgram Discord](https://discord.gg/deepgram)

By following these guidelines, your voice agent will be configured to take the lead in interactions, ensuring smoother and more engaging user experiences.
