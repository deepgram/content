using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        // Load your Deepgram API key from environment variables
        var apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");

        // Prepare your audio file
        var audioPath = "path/to/your/audio/file.mp3";
        var audioData = await File.ReadAllBytesAsync(audioPath);

        // Set the Deepgram API endpoint
        var url = "https://api.deepgram.com/v1/listen";

        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            var content = new ByteArrayContent(audioData);
            content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("audio/mpeg");

            // Make the POST request to Deepgram API
            var response = await client.PostAsync(url, content);
            string result = await response.Content.ReadAsStringAsync();
            Console.WriteLine("Transcription: " + result);
        }
    }
}

// Note: Replace "path/to/your/audio/file.mp3" with the actual path to your MP3 file. This code uploads the MP3 file as raw binary data to Deepgram's API using HttpClient in .NET.