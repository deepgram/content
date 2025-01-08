# Troubleshooting Connection Issues with Deepgram's WebSocket API

Real-time streaming with Deepgram's WebSocket API is a powerful tool, enabling developers to transcribe audio in real-time effectively. However, certain circumstances may lead to connection issues, hindering the use of this feature by some clients. This guide provides steps to diagnose and resolve such connectivity problems.

## Understanding the Issue

When users encounter difficulties connecting to Deepgram's WebSocket, it can manifest as a refusal to connect, interruptions, or disconnections. Notably, the problem can be specific to users or networks, affecting certain clients consistently, while others may connect without issue.

### Common Symptoms
- Users within the same network unable to connect.
- No recent changes from the client's network or the application.
- Disconnections occur frequently or after a set period.
- Error codes, such as 429, potentially indicating exceeded limits.

## Diagnostic Steps

### Step 1: Check for Network Restrictions
Ensure that no firewall or network restrictions are preventing WebSocket connections on the client side. Encourage users to test their equipment on a different network to rule out these factors.

### Step 2: Analyze Error Codes
Deepgram's API will provide error codes, which are critical for diagnosing connectivity issues:
- **Error 429**: This indicates hitting a rate limit or concurrency limit. Ensure your concurrency does not exceed your plan's allowance.

### Step 3: Review Concurrency Limits
Concurrency limits can be the most probable cause for connection issues if Error 429 is prevalent. While direct proactive checking isn't supported, monitoring your API responses can hint at this issue.

#### Concurrency Check Method
You may intermittently access API endpoints, such as `/projects`, as a hacky way to deduce your concurrency usage. Log potential 429 errors and manage connections prudently.

### Step 4: Implement a Proxy Server
Set up a proxy server to handle requests. This will provide centralized logging and control over active connections, making it easier to diagnose and manage concurrent usage effectively.

## What to Do If the Issue Persists

If you have exhausted the above options and the connections are still problematic, it might be necessary to:
- **Reach Out to Support**: If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [Deepgram Community on Discord](https://discord.gg/deepgram).

## Conclusion
Connection issues may occasionally occur due to network restrictions, rate limits, or unknown factors that might require direct intervention or adjustment. Following these steps will help diagnose, rectify, and maintain reliable connections with Deepgram's WebSocket API.

## References
- [Real-time Streaming API Documentation](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio)
- [Discord Community](https://discord.gg/deepgram)