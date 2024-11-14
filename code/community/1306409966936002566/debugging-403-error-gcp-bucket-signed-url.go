package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "os"

    dg "github.com/deepgram-devs/deepgram-go-sdk/deepgram"
)

func main() {
    apiKey := os.Getenv("DEEPGRAM_API_KEY")
    filepath := "./audio-file.wav" // Path to your audio file

    // Initialize Deepgram client
    client := dg.NewClient(apiKey)

    // Read audio file
    audioData, err := ioutil.ReadFile(filepath)
    if err != nil {
        log.Fatal(err)
    }

    // Transcribe audio
    options := map[string]interface{}{
        "language": "en-US",
    }
    response, err := client.TranscribeAudio(audioData, "audio/wav", options)
    if err != nil {
        log.Fatal(err)
    }

    // Print transcription
    transcript := response.Results.Channels[0].Alternatives[0].Transcript
    fmt.Println("Transcription:", transcript)
}