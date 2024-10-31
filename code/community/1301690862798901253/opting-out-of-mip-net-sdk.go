package main

import (
    "fmt"
    "log"
    "os"

    dg "github.com/deepgram-devs/deepgram-go-sdk"
)

func main() {
    apiKey := os.Getenv("DEEPGRAM_API_KEY")
    audioURL := "YOUR_AUDIO_FILE_URL" // Replace with your audio file URL

    client, err := dg.NewClient(apiKey)
    if err != nil {
        log.Fatalf("Failed to create Deepgram client: %v", err)
    }

    options := map[string]string{
        "mip_opt_out": "true", // Custom parameter
    }

    response, err := client.TranscribeAudioUrl(audioURL, options)
    if err != nil {
        log.Fatalf("Failed to transcribe audio: %v", err)
    }

    fmt.Printf("Transcription successful: %v\n", response)
}