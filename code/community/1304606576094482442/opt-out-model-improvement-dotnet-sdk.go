// Go example using Deepgram SDK
// Ensure 'github.com/deepgram/deepgram-go-sdk' is installed
// For environment variables, use a package like 'godotenv'

package main

import (
    "fmt"
    "os"

    "github.com/deepgram/deepgram-go-sdk/deepgram"
)

func main() {
    apiKey := os.Getenv("DEEPGRAM_API_KEY")
    audioUrl := os.Getenv("AUDIO_FILE_URL")

    dg := deepgram.New(apiKey)

    options := deepgram.PreRecordedOptions{
        URL: audioUrl,
        MipOptOut: true,
    }

    response, err := dg.TranscribePr(