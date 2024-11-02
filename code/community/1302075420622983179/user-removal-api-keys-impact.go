package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	// Get your Deepgram API key from the environment variables
	apiKey := os.Getenv("DEEPGRAM_API_KEY")

	// Deepgram API endpoint
	url := "https://api.deepgram.com/v1/listen"

	// Create a new HTTP request
	req, err := http.NewRequest("POST", url, nil)
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	// Add the Authorization header
	req.Header.Add("Authorization", "Bearer "+apiKey)

	// Execute the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error executing request:", err)
		return
	}
	defer resp.Body.Close()

	// Check the status and print the response
	fmt.Println("Response status:", resp.Status)
}

// NOTE: Before running, ensure you have set the DEEPGRAM_API_KEY environment variable.