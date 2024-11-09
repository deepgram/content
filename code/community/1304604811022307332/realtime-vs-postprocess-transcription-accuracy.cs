using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    private static readonly HttpClient client = new HttpClient();

    static async Task Main()
    {
        // Configure your Deepgram API Key via an environment variable
        var apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");

        if (apiKey == null)
        {
            Console.WriteLine("Please set the DEEPGRAM_API_KEY environment variable");
            return;
        }

        // Set the Deepgram endpoint for pre-recorded transcription
        var url = "https://api.deepgram.com/v1/listen";

        // Specify your audio source for transcription
        var audioUrl = "https://example.com/audio.wav";

        var content = new StringContent($"{{ \"url\": \"{audioUrl}\" }}", System.Text.Encoding.UTF8, "application/json");
        client.DefaultRequestHeaders.Add("Authorization", $"Token {apiKey}");

        var response = await client.PostAsync(url, content);
        var responseString = await response.Content.ReadAsStringAsync();

        Console.WriteLine("Final transcription: " + responseString);
    }
}