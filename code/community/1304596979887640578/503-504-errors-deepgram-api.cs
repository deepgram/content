using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

class Program
{
    private static readonly string deepgramApiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
    private static readonly string projectId = Environment.GetEnvironmentVariable("PROJECT_ID");
    private static readonly HttpClient client = new HttpClient();

    static async Task Main()
    {
        var url = "https://api.deepgram.com/v1/listen";
        var audioUrl = "https://example.com/audiofile.mp3";

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Token", deepgramApiKey);

        var jsonContent = new JObject
        {
            { "url", audioUrl },
            { "project", projectId }
        };

        var content = new StringContent(jsonContent.ToString(), System.Text.Encoding.UTF8, "application/json");

        var response = await client.PostAsync(url, content);

        if (response.IsSuccessStatusCode)
        {
            string resultContent = await response.Content.ReadAsStringAsync();
            Console.WriteLine("Transcription: " + resultContent);
        }
        else
        {
            Console.WriteLine("Error: " + response.StatusCode);
        }
    }
}