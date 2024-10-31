// Go example for using Deepgram's real-time streaming API with keyword boosting
// Requires the Deepgram Go SDK

package main

import (
    "context"
    "fmt"
    "os"

    "github.com/deepgram-devs/deepgram-go-sdk/deepgram"
)

func main() {
    apiKey := os.Getenv("DEEPGRAM_API_KEY")
    dg, err := deepgram.NewClient(apiKey, nil)
    if err != nil {
        fmt.Printf("Error creating Deepgram client: %v", err)
        return
    }

    options := deepgram.TranscriptionOptions{
        Keywords: []string{"JAY", "HAYWIRE"},
        Punctuate: true,
    }

    // Create a stream context
    ctx := context.Background()

    // Connect to stream
    stream, err := dg.Transcription.Stream(ctx, &options)
    if err != nil {
        fmt.Printf("Error connecting to stream: %v", err)
        return
    }

    // Example handling of received transcripts
    for transcript := range stream.Transcripts() {
        fmt.Printf("Transcript: %s\n", transcript.Channel.Alternatives[0].Transcript)
    }
}

// Note: Ensure your streaming setup sends continuous audio to this script.