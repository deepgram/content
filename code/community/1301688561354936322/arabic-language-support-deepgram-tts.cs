using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

class Program
{
    static async Task Main(string[] args)
    {
        var apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
        var url = "https://api.deepgram.com/v1/speak";

        using var client = new HttpClient();

        var content = new StringContent(JsonConvert.SerializeObject(new
        {
            text = "Hello, world!",
            voice = "en-US"
        }), Encoding.UTF8, "application/json");

        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", apiKey);

        HttpResponseMessage response = await client.PostAsync(url, content);

        if (response.IsSuccessStatusCode)
        {
            Console.WriteLine("Text-to-Speech executed successfully");
        }
        else
        {
            Console.WriteLine("Failed to execute Text-to-Speech");
        }
    }
}