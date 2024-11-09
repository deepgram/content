using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    private static readonly HttpClient client = new HttpClient();

    static async Task Main()
    {
        string apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
        string audioUrl = "https://your-audio-file-url.com/audio.wav";

        client.DefaultRequestHeaders.Add("Authorization", $"Token {apiKey}");

        var requestBody = new {
            url = audioUrl,
            diarize = true,
            punctuate = true
        };

        var response = await client.PostAsJsonAsync(
            "https://api.deepgram.com/v1/listen",
            requestBody
        );

        string responseString = await response.Content.ReadAsStringAsync();
        Console.WriteLine(responseString);
    }
}