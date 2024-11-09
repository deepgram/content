using System;
using System.IO;
using System.Threading.Tasks;
using Deepgram;

class Program
{
    private static readonly string apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
    private static readonly string filePath = "path/to/your/audiofile.wav";

    static async Task Main(string[] args)
    {
        var deepgramClient = new DeepgramClient(apiKey);

        try
        {
            using var audio = File.OpenRead(filePath);
            var options = new PrerecordedTranscriptionOptions
            {
                Mimetype = "audio/wav"
            };
            var transcription = await deepgramClient.Transcription.PrerecordedTranscription(audio, options);
            Console.WriteLine("Transcription: " + transcription.Results);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
        }
    }
}