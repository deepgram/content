package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

func main() {
	// Configure your Deepgram API Key via an environment variable
	apiKey := os.Getenv("DEEPGRAM_API_KEY")

	// Set the Deepgram endpoint for pre-recorded transcription
	url := "https://api.deepgram.com/v1/listen"

	// Specify your audio source for transcription
	audioURL := "https://example.com/audio.wav"

	// Prepare the request body
	requestBody, _ := json.Marshal(map[string]string{
		"url": audioURL,
	})

	// Create a new HTTP request
	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(requestBody))
	req.Header.Set("Authorization", fmt.Sprintf("Token %s", apiKey))
	req.Header.Set("Content-Type", "application/json")

	// Make the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	// Read the response
	var result map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&result)

	// Access and print the transcription result
	fmt.Println("Final transcription:", result) // Access the correct fields based on the actual JSON structure
}