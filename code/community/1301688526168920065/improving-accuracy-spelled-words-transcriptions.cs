// C# example for using Deepgram's real-time streaming API with keyword boosting
// Requires the `DeepgramSDK` NuGet package

using Deepgram;
using System;
using System.Threading.Tasks;

class Program
{
    private static readonly string apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");

    static async Task Main(string[] args)
    {
        var deepgramClient = new DeepgramClient(apiKey);

        var options = new RealTimeTranscriptionOptions
        {
            Punctuate = true,
            Keywords = new[] { "JAY", "HAYWIRE" }
        };

        var sessionId = Guid.NewGuid().ToString();

        await deepgramClient.TranscribeRealTime(sessionId, options, OnTranscriptionReceived);
    }

    private static void OnTranscriptionReceived(TranscriptionResponse response)
    {
        Console.WriteLine($"Transcript: {response.Channel.Alternatives[0].Transcript}");
    }
}

// Note: This example assumes you have a continuous audio feed being sent to the Deepgram API