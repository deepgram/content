using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

class DeepgramTTS
{
    private static readonly HttpClient client = new HttpClient();

    public static async Task Main(string[] args)
    {
        // Set the API key from environment variables
        string apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");

        // Set the API endpoint
        string apiEndpoint = "https://api.deepgram.com/v1/speak";

        // Construct text with phonetic spelling to improve pronunciation
        string text = "Prasanna (p-r-ah-s-a-n-n-a), Mangesh (m-uh-ng-ey-sh), Anil (ah-n-ee-l) are example names.";

        // JSON payload
        var payload = new
        {
            text = text,
            voice = "en-US" // Assuming the use of a US voice model
        };

        string jsonPayload = JsonConvert.SerializeObject(payload);

        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", apiKey);

        // Send POST request to Deepgram TTS API
        var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
        HttpResponseMessage response = await client.PostAsync(apiEndpoint, content);

        if (response.IsSuccessStatusCode)
        {
            Console.WriteLine("Audio generated successfully.");
        }
        else
        {
            Console.WriteLine($"Failed to generate audio: {response.StatusCode}");
        }
    }
}