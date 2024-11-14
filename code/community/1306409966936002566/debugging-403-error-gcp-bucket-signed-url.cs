using System;
using System.IO;
using System.Threading.Tasks;
using Deepgram;
using Deepgram.Transcription;

class Program
{
    static async Task Main(string[] args)
    {
        string apiKey = Environment.GetEnvironmentVariable("DEEPGRAM_API_KEY");
        DeepgramClient deepgram = new DeepgramClient(apiKey);

        string path = "./audio-file.wav";

        // Read the audio file
        using (var audio = new FileStream(path, FileMode.Open))
        {
            // Transcribe the audio
            var response = await deepgram.Transcription.Prerecorded.TranscribeAudioAsync(
                audio,
                new Deepgram.Transcription.Prerecorded.TranscriptionOptions
                {
                    Language = "en-US"
                }
            );

            Console.WriteLine("Transcription: " + response.Results.Channels[0].Alternatives[0].Transcript);
        }
    }
}