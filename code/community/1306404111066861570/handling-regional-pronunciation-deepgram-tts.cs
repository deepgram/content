using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace DeepgramTTS
{
    class Program
    {
        const string deepgramApiUrl = "https://api.deepgram.com/v1/speak";
        static readonly HttpClient client = new HttpClient();

        static async Task Main(string[] args)
        {
            // Ensure your Deepgram API key is set as an environment variable.
            string apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");

            var textPayload = new
            {
                text = "Hello, this is a test pronunciation of the name SpellingAlteration."
            };

            var content = new StringContent(JsonConvert.SerializeObject(textPayload), Encoding.UTF8, "application/json");
            client.DefaultRequestHeaders.Add("Authorization", $"Token {apiKey}");

            HttpResponseMessage response = await client.PostAsync(deepgramApiUrl, content);

            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine("Request successful!");
                var responseContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Audio response:", responseContent);
            }
            else
            {
                Console.WriteLine($"Request failed with status code: {response.StatusCode}");
            }
        }
    }
}