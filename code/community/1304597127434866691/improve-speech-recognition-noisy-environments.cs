using System;
using System.Threading.Tasks;
using Deepgram.SDK;
using Deepgram.Transcription;

class Program
{
    static async Task Main(string[] args)
    {
        var deepgramApiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
        var audioUrl = Environment.GetEnvironmentVariable("AUDIO_URL");

        var deepgramClient = new DeepgramClient(deepgramApiKey);

        var options = new PreRecordedTranscriptionOptions
        {
            Punctuate = true,
            NoiseFilter = true // Enable noise reduction
        };

        var response = await deepgramClient.Transcription.PrerecordedFromUrlAsync(audioUrl, options);

        Console.WriteLine($"Transcription: {response.Results.Channels[0].Alternatives[0].Transcript}");
    }
}