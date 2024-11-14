// C# code to check for job status using Deepgram API
// Requires installation of `DeepgramSDK` via NuGet
// To run, replace placeholders with real values

using DeepgramSDK;
using System;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        string apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
        string jobId = "your-job-id";

        var dgClient = new DeepgramClient(apiKey);

        try
        {
            // Fetch job status
            var response = await dgClient.GetTranscriptionStatusAsync(jobId);
            Console.WriteLine("Job status: {0}", response.Metadata.Status);
            // Handle job status accordingly
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: {0}", ex.Message);
        }
    }
}