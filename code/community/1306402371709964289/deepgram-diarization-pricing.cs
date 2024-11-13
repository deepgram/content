using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

class Program
{
    private static readonly HttpClient client = new HttpClient();

    static async Task Main()
    {
        var builder = new ConfigurationBuilder()
            .AddEnvironmentVariables();
        var configuration = builder.Build();

        string apiKey = configuration["DEEPGRAM_API_KEY"];
        string audioUrl = configuration["AUDIO_URL"];

        var requestContent = new StringContent(
            "{"url":"" + audioUrl + "","diarize":true}",
            Encoding.UTF8,
            "application/json"
        );

        client.DefaultRequestHeaders.Add("Authorization", "Token " + apiKey);

        var response = await client.PostAsync("https://api.deepgram.com/v1/listen", requestContent);
        var responseString = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseString);
    }
}