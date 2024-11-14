using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    private static readonly Uri DeepgramUri = new Uri("wss://api.deepgram.com/v1/listen?model=multi");
    private static readonly string ApiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");

    public static async Task Main(string[] args)
    {
        using(ClientWebSocket webSocket = new ClientWebSocket())
        {
            webSocket.Options.SetRequestHeader("Authorization", $"Token {ApiKey}");
            await webSocket.ConnectAsync(DeepgramUri, CancellationToken.None);
            Console.WriteLine("Connected to Deepgram");

            // Send your audio bytes here
            byte[] buffer = Encoding.UTF8.GetBytes("Your audio stream chunk here"); // replace with actual audio data
            await webSocket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);

            // Receiving response
            buffer = new byte[1024];
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            Console.WriteLine("Received: " + Encoding.UTF8.GetString(buffer, 0, result.Count));

            await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, string.Empty, CancellationToken.None);
        }
    }

    // Store DEEPGRAM_API_KEY in environment variables.
    // Replace "Your audio stream chunk here" with actual audio byte stream.
}