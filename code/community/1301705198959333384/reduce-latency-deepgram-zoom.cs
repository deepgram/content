using System;
using System.Threading;
using Deepgram;
using Websocket.Client;

class Program
{
    static async Task Main(string[] args)
    {
        // Get API key from environment variables
        var apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
        if (string.IsNullOrEmpty(apiKey))
        {
            Console.WriteLine("API Key is not set");
            return;
        }

        // Define Deepgram endpoint and live options
        var deepgramEndpointUrl = "your-zoom-websocket-url";
        var deepgramLiveOptions = new DeepgramLiveOptions
        {
            Punctuate = true,
            InterimResults = true
        };

        // Initialize Deepgram client
        var deepgramClient = new Deepgram.Client(apiKey);

        using (var client = new WebsocketClient(new Uri(deepgramClient.LiveDeepgram(deepgramEndpointUrl, deepgramLiveOptions))))
        {
            client.MessageReceived.Subscribe(msg =>
            {
                Console.WriteLine($"Received: {msg.Text}");
            });

            // Start listening to the websocket
            await client.Start();

            // Keep the application running until the user closes it
            Console.ReadLine();
        }
    }
}

// Notes on using the Deepgram .NET SDK should accompany this code.