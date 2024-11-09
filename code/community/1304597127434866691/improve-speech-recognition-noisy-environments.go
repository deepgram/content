package main

import (
	"context"
	"fmt"
	"os"

	"github.com/deepgram-devs/deepgram-go-client/sdk"
)

func main() {
	deepgramApiKey := os.Getenv("DEEPGRAM_API_KEY")
	audioURL := os.Getenv("AUDIO_URL")

	// Initialize Deepgram client
	client := sdk.NewClient(deepgramApiKey)

	// Prepare request options
	options := sdk.TranscriptionOptions{
		Punctuate:    true,
		NoiseReduction: true, // Enable noise reduction
	}

	// Perform transcription
	response, err := client.TranscribeURL(context.Background(), audioURL, options)
	if err != nil {
		fmt.Printf("Failed to transcribe audio: %s\n", err)
		return
	}

	// Print transcription
	fmt.Printf("Transcription: %s\n", response.Results.Channels[0].Alternatives[0].Transcript)
}