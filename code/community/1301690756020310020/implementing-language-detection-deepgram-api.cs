using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    private static readonly HttpClient client = new HttpClient();

    static async Task Main()
    {
        var apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");

        client.DefaultRequestHeaders.Add("Authorization", $"Token {apiKey}");

        var url = "https://api.deepgram.com/v1/listen?detect_language=true";

        var audioBytes = await File.ReadAllBytesAsync("your_audio_file.mp3");
        var audioContent = new ByteArrayContent(audioBytes);
        audioContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("audio/mpeg");

        var response = await client.PostAsync(url, audioContent);
        var responseString = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseString);
    }
}