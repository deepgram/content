package main

import (
    "bytes"
    "fmt"
    "io/ioutil"
    "net/http"
    "os"
)

func main() {
    // Load your Deepgram API key from environment variables
    apiKey := os.Getenv("DEEPGRAM_API_KEY")

    // Prepare your audio file
    audioPath := "path/to/your/audio/file.mp3"
    audioData, err := ioutil.ReadFile(audioPath)
    if err != nil {
        panic(fmt.Sprintf("Failed to read audio file: %v", err))
    }

    // Set the Deepgram API endpoint
    url := "https://api.deepgram.com/v1/listen"

    // Create request to Deepgram API
    request, err := http.NewRequest("POST", url, bytes.NewBuffer(audioData))
    if err != nil {
        panic(fmt.Sprintf("Failed to create request: %v", err))
    }

    request.Header.Set("Authorization", fmt.Sprintf("Bearer %s", apiKey))
    request.Header.Set("Content-Type", "audio/mpeg")

    // Perform request
    client := &http.Client{}
    response, err := client.Do(request)
    if err != nil {
        panic(fmt.Sprintf("Request failed: %v", err))
    }
    defer response.Body.Close()

    // Check response and output transcription
    if response.StatusCode == http.StatusOK {
        bodyBytes, _ := ioutil.ReadAll(response.Body)
        fmt.Println("Transcription:", string(bodyBytes))
    } else {
        fmt.Printf("Unexpected status: %s\n", response.Status)
    }
}

// Note: Replace "path/to/your/audio/file.mp3" with the actual path to your MP3 file. This code uploads the audio file as raw binary data to Deepgram's API in Go using the 'net/http' package. Ensure you handle errors and responses adequately in production code.