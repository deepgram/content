package main

import (
	"fmt"
	"os"

	"github.com/deepgram/go-sdk/deepgram"
)

func main() {
	apiKey := os.Getenv("DEEPGRAM_API_KEY")
	filePath := "path/to/your/audiofile.wav"

	client := deepgram.NewClient(apiKey)
	file, err := os.Open(filePath)
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	options := deepgram.TranscriptionOptions{}
	result, err := client.Transcribe(file, options)
	if err != nil {
		fmt.Println("Error transcribing audio:", err)
		return
	}

	fmt.Println("Transcription:", result)
}