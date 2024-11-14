using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    private static readonly HttpClient client = new HttpClient();

    static async Task Main(string[] args)
    {
        string deepgramApiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
        string audioFilePath = "your_audio_file_path.wav";

        if (string.IsNullOrEmpty(deepgramApiKey))
        {
            Console.WriteLine("DEEPGRAM_API_KEY environment variable must be set.");
            return;
        }

        byte[] audioData = File.ReadAllBytes(audioFilePath);
        using (var content = new ByteArrayContent(audioData))
        {
            content.Headers.Add("Authorization", $"Token {deepgramApiKey}");
            content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("audio/wav");

            HttpResponseMessage response = await client.PostAsync("https://api.deepgram.com/v1/listen", content);
            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Transcription results: " + responseBody);
            }
            else
            {
                Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
            }
        }
    }
}