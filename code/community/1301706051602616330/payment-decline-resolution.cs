using Deepgram;
using System;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        var deepgramApiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
        var client = new DeepgramClient(deepgramApiKey);

        var source = new { url = "https://storage.googleapis.com/deepgram-demos/voicemail.mp3" };

        var response = await client.Transcription.PreRecordedAsync(source, new { language = "en-US" });

        Console.WriteLine(response);
    }
}