# Resolving Issues with Deepgram's JavaScript SDK for Streaming Text-to-Speech
In recent discussions within our community, a prospect encountered a challenge while using an example from Deepgram's JavaScript SDK for text-to-speech (TTS) streaming. This post details the issue, proposed solutions, and our ongoing work to ensure users have a seamless experience with our tools.

### The Issue 
A prospect, exploring the capabilities of our streaming TTS SDK, reported an issue where the output generated was corrupted when following an example from our documentation. Specifically, when attempting to integrate the SDK, they encountered difficulties getting the `arrayBuffer` to maintain the necessary metadata, resulting in an audio file that wouldn't play properly.

### Diagnosis
After reviewing the issue, we identified it as related to the stream’s data not being properly containerized with the appropriate headers. The headers, essential for establishing correct playback of audio files, were not being appended correctly in the provided example.

### Immediate Next Steps 
Our team quickly identified that the example code needed modification to include the necessary audio headers. David participates actively in discussions to ensure that header values match the expected sample rate and other audio file requirements to fix this anomaly, referred humorously in the team as the “chipmunk model” for its effect of high-pitched audio output.

### Community Engagement and Support 
Recognizing the urgency, our support team assured the prospect that we are actively investigating and resolving the issue. We are committed to community-driven innovation and understand its power in discovering, diagnosing, and resolving technical challenges effectively.

### Solutions and Improvements 
As of today, we have updated the example code in our [GitHub repository](https://github.com/deepgram/deepgram-js-sdk/commit/bb5c8b29cea27f28311cc717258a183d23ffaa79) to ensure that the buffer headers are included correctly. Moreover, we're offering additional support documentation and a new [Starter App for Node.js](https://github.com/deepgram-starters/node-live-text-to-speech) that can help users get started with TTS live streaming promptly and efficiently.

### Future Outlook
As part of Deepgram's commitment to improving user experience, we plan to continue refining our SDKs and supporting our users through ongoing improvements inspired by real-world usage and feedback. We appreciate the patience and input from our users and look forward to empowering them in their exploration of streaming technologies.

We are grateful to David, Luke, Naomi, and other members of our team for their swift reaction and dedication to resolving this community-powered misunderstanding effectively. If you're exploring similar technologies and encountering issues, remember our growing community and support team is here to ensure you succeed in your applications with Deepgram.

Feel free to reach out on our community forums or directly via support channels if you run into similar issues or want to provide feedback on how we can create an even better SDK experience. Let's make this journey impactful together!