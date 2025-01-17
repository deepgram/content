# Resolving CORS Policy Issue for Deepgram Transcription on EC2 Deployment

When deploying a monolithic backend on an Amazon EC2 instance with custom domains, you might encounter an issue where your Deepgram transcription route fails due to a CORS policy restriction. This occurs when the 'Access-Control-Allow-Origin' header is not present in the response from your server, leading to blocked requests when trying to access resources across domains from a web client.

## Understanding CORS

Cross-Origin Resource Sharing (CORS) is a security feature implemented by browsers to restrict web applications from requesting resources from a different origin than the one that served the web page. In a deployed environment, unlike local development, your requests might be rejected due to the absence of this header, resulting in the CORS policy blocking the requests.

## Solution Overview

To resolve this issue, a common approach involves setting up a lightweight proxy server. A proxy can manage the requests and responses between your web client and the Deepgram API, including adding necessary headers to bypass CORS restrictions.

### Setting Up a Lightweight Proxy

Here's a practical suggestion for setting up a proxy server:

- **Proxy Configuration:** You can configure your server to route API requests through a proxy that adds the 'Access-Control-Allow-Origin' header to the responses.

- **Node.js Proxy Example:** Deepgram provides a basic [Node.js proxy](https://github.com/deepgram-devs/deepgram-node-proxy) you can adapt for this purpose. This proxy is designed to handle requests through a lightweight setup, ideally suitable for development and production use cases.

Setting up a proxy server can be done by deploying this Node.js application on your server and configuring it to forward requests from the client to the Deepgram API.

### Additional Considerations

- **Payload Size:** Ensure that your server and proxy can handle the request and response sizes expected in your application. For instance, with Nginx acting as a reverse proxy, you might need to adjust the `client_max_body_size` directive to accommodate large payloads.

- **Security:** Caution should be taken to secure your proxy setup to prevent unauthorized access and data leakage.

### Conclusion

Handling CORS issues in a deployed environment requires careful consideration of how you route and proxy requests between your client and external services like Deepgram. Implementing a proxy server is a practical method to ensure that necessary headers are properly managed without exposing your application to security risks.

For further assistance, reach out to our community or your Deepgram support representative: [Deepgram Discord Community](https://discord.gg/deepgram)

### References

- [CORS in MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Node.js Proxy Server Example by Deepgram](https://github.com/deepgram-devs/deepgram-node-proxy)