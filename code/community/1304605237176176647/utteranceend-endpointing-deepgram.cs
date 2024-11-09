// C# example using WebSocketSharp library

using System;
using System.Text;
using WebSocketSharp;

namespace DeepgramExample
{
    class Program
    {
        static void Main(string[] args)
        {
            var apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
            var url = "wss://api.deepgram.com/v1/listen?endpointing=800&utterance_end_ms=2000";

            using (var ws = new WebSocket(url))
            {
                ws.OnMessage += (sender, e) =>
                {
                    string message = e.Data;
                    if (message.Contains("speech_final": true))
                    {
                        Console.WriteLine("Speech has ended based on speech_final flag.");
                    }
                    else if (message.Contains("UtteranceEnd"))
                    {
                        Console.WriteLine("Utterance has ended with no preceding speech_final.");
                    }
                };

                // Sending dummy audio data (this should be real audio data in a proper implementation)
                ws.Connect();
                ws.Send(Encoding.UTF8.GetBytes("\x01\x02\x03\x04\x05"));

                Console.ReadKey();
            }
        }
    }
}
// Reference: https://github.com/sta/websocket-sharp