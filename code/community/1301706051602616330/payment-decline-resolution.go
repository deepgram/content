package main

import (
	"fmt"
	"os"

	"github.com/deepgram-devs/deepgram-go"
)

func main() {
	apiKey := os.Getenv("DEEPGRAM_API_KEY")
	client := deepgram.NewClient(apiKey)

	url := "https://storage.googleapis.com/deepgram-demos/voicemail.mp3"

	options := deepgram.TranscriptionOptions{
		Language: "en-US",
	}

	transcription, err := client.TranscribeUrl(url, options)
	if err != nil {
		fmt.Println("Error:", err)
	}

	fmt.Printf("Transcription: %+v\n", transcription)
}