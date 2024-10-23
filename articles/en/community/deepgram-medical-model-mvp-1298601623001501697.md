# Getting Started with Deepgram's Medical Model for Real-Time Transcription

Explore how to start building a Minimum Viable Product (MVP) using Deepgram's Nova-2 Medical model for enhancing clinical documentation in real-time settings. This guide will walk you through the necessary procedures and resources to effectively utilize Deepgram's API for medical transcription.

## Understanding Deepgram’s Nova-2 Model
Deepgram's **Nova-2 Medical model** focuses on delivering low word error rates with specific enhancements for medical terminology through real-time transcription. Utilize this model to improve clinical documentation workflows by automatically transcribing audio to text.

### API Credentials
- **Create an Account**: Visit Deepgram and [sign up](https://console.deepgram.com/signup?jump=keys) to create a free account. New users have access to $200 worth of services.
- **API Key**: Generate your [API Key](https://developers.deepgram.com/documentation/getting-started/authentication/#create-an-api-key) once account registration is complete.

### Model Syntax
For leveraging the Nova-2 Medical model, make requests with this specific query:
```
https://api.deepgram.com/v1/listen?model=nova-2-medical
```

## Steps to Get Started

1. **Leverage the Deepgram Console**:
   - Navigate to 'Demo: Transcribe' under the Deepgram Console to test live transcription using Nova-2 Medical without any preliminary coding.

2. **Explore Deepgram's SDKs**:
   - Choose your preferred programming language and utilize Deepgram’s SDKs to integrate the API into your platform.
     - Python [Deepgram SDK](https://github.com/deepgram/deepgram-python-sdk) 
     - Node.js [Deepgram SDK](https://github.com/deepgram/deepgram-js-sdk) 
     - .NET [Deepgram SDK](https://github.com/deepgram/deepgram-dotnet-sdk) 
     - Rust [Deepgram SDK](https://github.com/deepgram/deepgram-rust-sdk) 
     - Go [Deepgram SDK](https://github.com/deepgram/deepgram-go-sdk)

3. **Use Case Exploration**:
   - Examine various [use case examples](https://developers.deepgram.com/use-cases/) to understand real-world applications of Deepgram’s transcription capabilities.

4. **Hands-on Experience with Code Samples**:
   - Access a library of code samples on Deepgram’s [GitHub repo](https://github.com/deepgram-devs/code-samples) to see practical implementations.

## Conclusion
Deepgram’s Nova-2 Medical model is exceptionally robust for delivering precise, real-time transcription tailored for medical settings. Whether you’re starting from scratch or enhancing an existing system, this guide should empower you with the needed resources and steps.

For additional support, contact Deepgram’s community via their [Discord channel](https://discord.gg/deepgram) or [GitHub Discussions](https://github.com/orgs/deepgram/discussions).

## References
- [Deepgram's Medical Model Documentation](https://developers.deepgram.com/docs/models-languages-overview)
- [Deepgram Use Cases](https://developers.deepgram.com/use-cases/)
- GitHub: [Deepgram Code Samples](https://github.com/deepgram-devs/code-samples)