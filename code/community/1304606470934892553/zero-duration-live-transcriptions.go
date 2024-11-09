package main

import (
    "fmt"
    "os"

    "github.com/deepgram/deepgram-sdk-go/deepgram"
)

func main() {
    apiKey := os.Getenv("DEEPGRAM_API_KEY")
    dgClient := deepgram.NewClient(apiKey)

    options := deepgram.TranscriptionOptions{
        Punctuate:   true,
        Encoding:    "mulaw",
        Channels:    2,
        SampleRate:  8000,
        Multichannel: true, // Ensure multichannel is set to true for multiple channels
    }

    response, err := dgClient.StartLiveTranscription(options)
    if err != nil {
        fmt.Printf("Error starting live transcription: %v", err)
        return
    }

    fmt.Printf("Live transcription started successfully: %v", response)

    // For more about multichannel setup, refer to: https://developers.deepgram.com/docs/multichannel
}