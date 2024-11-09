using Deepgram; // Assume Deepgram SDK is installed
using System;
using System.Threading.Tasks;
using System.Threading;

class Program
{
    static async Task Main(string[] args)
    {
        string deepgramApiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
        string projectId = Environment.GetEnvironmentVariable("PROJECT_ID");
        string filePath = "path/to/your/file.wav";  // Update with your actual file path

        var deepgramClient = new DeepgramClient(deepgramApiKey);

        // Transcribe the file
        var response = await deepgramClient.Transcription.Prerecorded(filePath, new { punctuate = true });
        string requestId = response.Metadata.RequestId;
        Console.WriteLine($"Transcription done, request_id: {requestId}");

        // Get usage cost
        while (true)
        {
            try
            {
                var usage = await deepgramClient.Usage.GetUsageRequest(projectId, requestId);
                if (usage.Items.Length > 0)
                {
                    Console.WriteLine($"Cost for the request: {usage.Items[0].Cost}");
                    break;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching usage: {ex.Message}. Retrying in 5 seconds...");
            }

            Thread.Sleep(5000);
        }
    }
}

// Note: Add DeepgramClient from Deepgram SDK in using section and include Thread.Sleep for retries.