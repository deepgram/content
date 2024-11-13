using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

class Program
{
    private static readonly HttpClient client = new HttpClient();

    static async Task Main()
    {
        var apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
        var audioUrl = Environment.GetEnvironmentVariable("AUDIO_URL");

        client.DefaultRequestHeaders.Add("Authorization", $"Token {apiKey}");

        var payload = new
        {
            url = audioUrl,
            diarize = true
        };

        var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");

        var response = await client.PostAsync("https://api.deepgram.com/v1/listen", content);

        var responseString = await response.Content.ReadAsStringAsync();

        Console.WriteLine(response.IsSuccessStatusCode ? "Transcription result: " + responseString : "Error: " + response.StatusCode + responseString);
    }
}