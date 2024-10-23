using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using System.Text;

class Program
{
    static async Task Main()
    {
        // Get the Deepgram API Key from environment variables
        string apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
        string url = "wss://api.deepgram.com/v1/listen";
        
        using (ClientWebSocket client = new ClientWebSocket())
        {
            client.Options.SetRequestHeader("Authorization", $"Token {apiKey}");

            // Connect to the Deepgram WebSocket API
            await client.ConnectAsync(new Uri(url), CancellationToken.None);
            Console.WriteLine("Connected to Deepgram API");

            // Sending example data/message through WebSocket
            byte[] buffer = Encoding.UTF8.GetBytes("Your data or message here");
            await client.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
            
            // Logic to handle receiving messages can be added here
        }
    }
}

// Note: Ensure DEEPGRAM_API_KEY is set in the environment variables beforehand.