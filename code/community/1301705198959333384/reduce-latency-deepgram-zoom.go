package main

import (
	"context"
	"fmt"
	"os"

	"github.com/deepgram-devs/deepgram-go-sdk/deepgramapi"
)

func main() {
	// Use context for cancellation
	ctx := context.Background()

	// Get the Deepgram API Key from environment variable
	apiKey, exists := os.LookupEnv("DEEPGRAM_API_KEY")
	if !exists {
		panic("DEEPGRAM_API_KEY environment variable not set")
	}

	// Initialize Deepgram client
	client := deepgramapi.NewClient(apiKey)

	// Define the audio stream source, e.g., from Zoom
	audioSource := "your-zoom-websocket-url"

	// Live stream options
	options := deepgramapi.LiveOptions{
		Punctuate:      true,
		InterimResults: true,
	}

	// Set up a live transcribe session	err := client.LiveAudio(ctx, audioSource, options, func(result deepgramapi.TranscriptResult) {
		for _, alternative := range result.Results {
			if alternative.IsFinal {
				fmt.Println("Final Transcript:", alternative.Alternatives[0].Transcript)
			}
		}
	})

	if err != nil {
		fmt.Println("Error during transcription:", err)
	}

	// Follow the Deepgram Go SDK documentation for more options and configurations
}
