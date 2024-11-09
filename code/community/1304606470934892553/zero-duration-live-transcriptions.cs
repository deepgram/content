using System;
using System.Threading.Tasks;
using Deepgram.Transcription;

class Program
{
    static async Task Main(string[] args)
    {
        string deepgramApiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");

        var dgClient = new DeepgramClient(deepgramApiKey);

        var options = new LiveTranscriptionOptions
        {
            Punctuate = true,
            Encoding = "mulaw",
            Channels = 2,
            SampleRate = 8000,
            Multichannel = true // Ensure multichannel is set to true for multiple channels
        };

        try
        {
            var response = await dgClient.StartLiveTranscriptionAsync(options);
            Console.WriteLine("Live transcription started successfully: " + response);
        }
        catch (Exception e)
        {
            Console.WriteLine("Error starting live transcription: " + e.Message);
        }
    }
}

// For more about multichannel setup, refer to: https://developers.deepgram.com/docs/multichannel