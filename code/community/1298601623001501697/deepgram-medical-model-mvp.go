package main

import (
	"context"
	"fmt"
	"os"

	"github.com/deepgram-devs/deepgram-go-sdk/deepgram"
)

func main() {
	dgKey := os.Getenv("DEEPGRAM_API_KEY")
	model := "nova-2-medical"
	ctx := context.Background()

	client := deepgram.NewClient(dgKey)
	audioURL := "<YOUR_AUDIO_URL_HERE>" // Replace with your audio file URL

	options := deepgram.PreRecordedOptions{
		Model:   model,
		Language: deepgram.LanguageEnglishUS,
	}

	result, err := client.TranscribePreRecorded(ctx, audioURL, options)
	if err != nil {
		fmt.Println("Error transcribing audio:", err)
		return
	}

	transcript := result.Results.Channels[0].Alternatives[0].Transcript
	fmt.Println("Transcript:", transcript)
}