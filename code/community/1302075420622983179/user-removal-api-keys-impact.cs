using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        // Get your Deepgram API key from the environment variables
        var apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");

        // Deepgram API endpoint
        var url = "https://api.deepgram.com/v1/listen";

        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            // Make the HTTP POST request
            var response = await client.PostAsync(url, null);

            // Check the status and print the response
            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Response: " + responseData);
            }
            else
            {
                Console.WriteLine("Request failed with status: " + response.StatusCode);
            }
        }
    }
}

// NOTE: Before running, ensure you have set the DEEPGRAM_API_KEY environment variable.