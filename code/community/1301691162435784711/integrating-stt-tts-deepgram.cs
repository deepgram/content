using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using System.Text;
using System.Collections.Specialized;
using System.Web;

class Program
{
    private static async Task ConnectSttAsync()
    {
        using (ClientWebSocket socket = new ClientWebSocket())
        {
            var uri = new Uri("wss://api.deepgram.com/v1/listen");
            socket.Options.SetRequestHeader("Authorization", "Token " + Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY"));

            await socket.ConnectAsync(uri, CancellationToken.None);

            Console.WriteLine("WebSocket STT Connection Established");

            var message = Encoding.UTF8.GetBytes("{\"content-type\": \"audio/wav\", \"interim_results\": true}");
            await socket.SendAsync(new ArraySegment<byte>(message), WebSocketMessageType.Text, true, CancellationToken.None);

            var buffer = new byte[1024];
            while (socket.State == WebSocketState.Open)
            {
                var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                Console.WriteLine("STT Received: " + Encoding.UTF8.GetString(buffer, 0, result.Count));
            }
        }
    }

    private static async Task ConnectTtsAsync()
    {
        using (ClientWebSocket socket = new ClientWebSocket())
        {
            var uri = new Uri("wss://api.deepgram.com/v1/speak");
            socket.Options.SetRequestHeader("Authorization", "Token " + Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY"));

            await socket.ConnectAsync(uri, CancellationToken.None);

            Console.WriteLine("WebSocket TTS Connection Established");

            var message = Encoding.UTF8.GetBytes("Hello, this is a Deepgram TTS test.");
            await socket.SendAsync(new ArraySegment<byte>(message), WebSocketMessageType.Text, true, CancellationToken.None);

            var buffer = new byte[1024];
            while (socket.State == WebSocketState.Open)
            {
                var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                Console.WriteLine("TTS Received: " + Encoding.UTF8.GetString(buffer, 0, result.Count));
            }
        }
    }

    public static async Task Main(string[] args)
    {
        await Task.WhenAll(ConnectSttAsync(), ConnectTtsAsync());
    }
}