// Go code to check for job status using Deepgram API
// Requires installation of Deepgram Go SDK
// To run, replace placeholders with real values and implement your error handling

package main

import (
	"fmt"
	"github.com/deepgram-devs/deepgram-go-sdk"
	"os"
)

func main() {
	apiKey := os.Getenv("DEEPGRAM_API_KEY")
	jobId := "your-job-id"

	client := deepgram.NewClient(apiKey)

	response, err := client.GetTranscriptionStatus(jobId)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}

	fmt.Printf("Job status: %v\n", response.Metadata.Status)
	// Handle job status accordingly
}