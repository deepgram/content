using Deepgram;
using Deepgram.Transcription;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        var apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
        var model = "nova-2-medical";

        var deepgramClient = new DeepgramClient(apiKey);

        var audioSource = new Dictionary<string, string> {
            { "url", "<YOUR_AUDIO_SOURCE_URL>" }  // Replace with your audio source
        };

        var options = new TranscriptionOptions()
        {
            Model = model,
            Language = "en-US"
        };

        var response = await deepgramClient.Transcription.PreRecordedAsync(audioSource, options);

        Console.WriteLine("Transcript: " + response.Results.Channels[0].Alternatives[0].Transcript);
    }
}