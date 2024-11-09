using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using System.IO;

class Program
{
    static async Task Main(string[] args)
    {
        string apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
        string audioFilePath = Environment.GetEnvironmentVariable("AUDIO_FILE_PATH");
        Uri deepgramUri = new Uri("wss://api.deepgram.com/v1/listen");

        using (var webSocket = new ClientWebSocket())
        {
            webSocket.Options.SetRequestHeader("Authorization", $"Token {apiKey}");
            await webSocket.ConnectAsync(deepgramUri, CancellationToken.None);

            byte[] buffer = new byte[1024 * 4];

            using (var fs = new FileStream(audioFilePath, FileMode.Open, FileAccess.Read))
            {
                int bytesRead;
                while ((bytesRead = await fs.ReadAsync(buffer, 0, buffer.Length)) > 0)
                {
                    await webSocket.SendAsync(new ArraySegment<byte>(buffer, 0, bytesRead),
                                               WebSocketMessageType.Binary,
                                               false,
                                               CancellationToken.None);
                }
            }

            // Close the socket
            await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Done", CancellationToken.None);
        }
    }
}