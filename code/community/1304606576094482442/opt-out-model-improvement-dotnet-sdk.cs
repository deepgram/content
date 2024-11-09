// C# example using Deepgram SDK
// Ensure 'DeepgramApi' NuGet package is installed
// For environment variables, use a .env file or IDE settings

using System;
using System.Threading.Tasks;
using Deepgram;

namespace DeepgramExample
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
            var audioUrl = Environment.GetEnvironmentVariable("AUDIO_FILE_URL");

            var deepgramClient = new DeepgramClient(apiKey);

            var options = new Deepgram.Options.PreRecordedTranscriptionOptions {
                Url = audioUrl,
                MipOptOut = true
            };

            var response = await deepgramClient.Transcription.PrerecordedAsync(options);

            Console.WriteLine(response);
        }
    }
}