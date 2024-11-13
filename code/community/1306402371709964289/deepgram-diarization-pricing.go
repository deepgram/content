package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

func main() {
	apiKey := os.Getenv("DEEPGRAM_API_KEY")
	audioURL := os.Getenv("AUDIO_URL")

	// API endpoint
	url := "https://api.deepgram.com/v1/listen"

	// Prepare payload
	payload := map[string]interface{}{
		"url":     audioURL,
		"diarize": true,
	}
	jsonPayload, _ := json.Marshal(payload)

	// Create a new request
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	// Set headers
	req.Header.Set("Authorization", fmt.Sprintf("Token %s", apiKey))
	req.Header.Set("Content-Type", "application/json")

	// Perform the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error making API call:", err)
		return
	}
	defer resp.Body.Close()

	// Output the response
	buf := new(bytes.Buffer)
	buf.ReadFrom(resp.Body)
	fmt.Println(buf.String())
}