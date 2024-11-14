package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

func main() {
	// Set the API key from environment variables
	apiKey := os.Getenv("DEEPGRAM_API_KEY")

	// Set the API endpoint
	apiEndpoint := "https://api.deepgram.com/v1/speak"

	// Construct text with phonetic spelling to improve pronunciation
	text := "Prasanna (p-r-ah-s-a-n-n-a), Mangesh (m-uh-ng-ey-sh), Anil (ah-n-ee-l) are example names."

	// JSON payload
	payload := map[string]string{
		"text":  text,
		"voice": "en-US", // Assuming the use of a US voice model
	}

	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		fmt.Printf("Error marshalling JSON: %s\n", err)
		return
	}

	req, err := http.NewRequest("POST", apiEndpoint, bytes.NewReader(payloadBytes))
	if err != nil {
		fmt.Printf("Error creating request: %s\n", err)
		return
	}
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Printf("Error sending request: %s\n", err)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusOK {
		fmt.Println("Audio generated successfully.")
	} else {
		fmt.Printf("Failed to generate audio: %d\n", resp.StatusCode)
	}
}