using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Deepgram;

class Program
{
    private static readonly string ApiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");

    static async Task Main(string[] args)
    {
        var deepgramClient = new DeepgramClient(ApiKey);
        var options = new Dictionary<string, string>
        {
            { "mip_opt_out", "true" } // Custom parameter
        };

        var response = await deepgramClient.Transcription.PrerecordedTranscriptionAsync("YOUR_AUDIO_FILE_URL", options); // Replace with your audio file URL

        Console.WriteLine("Transcription successful:");
        Console.WriteLine(response);
    }
}