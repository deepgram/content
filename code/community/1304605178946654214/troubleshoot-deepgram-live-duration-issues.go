package main

import (
	"os"
	"fmt"
	"context"
	"io/ioutil"
	"log"

	"github.com/deepgram/sdk-go-example"
)

func main() {
	apiKey := os.Getenv("DEEPGRAM_API_KEY")
	audioFilePath := os.Getenv("AUDIO_FILE_PATH")

	ctx := context.Background()
	client, err := deepgram.NewClient(apiKey)
	if err != nil {
		log.Fatalf("Failed to create Deepgram client: %v", err)
	}

	options := &deepgram.LiveTranscriptionOptions{
		Punctuate: true,
	}

	transcriptCh, err := client.LiveTranscription(ctx, audioFilePath, options)
	if err != nil {
		log.Fatalf("Failed to start live transcription: %v", err)
	}

	for transcript := range transcriptCh {
		fmt.Printf("Transcript: %v\n", transcript)
	}
}