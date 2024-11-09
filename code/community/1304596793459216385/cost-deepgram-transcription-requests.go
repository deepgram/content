package main

import (
	"context"
	"fmt"
	"os"
	"time"

	deepgram "github.com/deepgram/deepgram-go-sdk/deepgram"
)

func main() {
	dgApiKey := os.Getenv("DEEPGRAM_API_KEY")
	projectId := os.Getenv("PROJECT_ID")
	filePath := "path/to/your/file.wav"  // Update with your actual file path

	client, err := deepgram.NewClient(dgApiKey)
	if err != nil {
		fmt.Println("Error creating Deepgram client:", err)
		return
	}

	result, _ := client.PrerecordedTranscription(filePath, nil)
	requestId := result.Metadata.RequestID
	fmt.Printf("Transcription done, request_id: %s\n", requestId)

	usageFound := false

	for !usageFound {
		usage, err := client.GetUsageRequest(context.Background(), projectId, requestId)
		if err != nil {
			fmt.Println("Error fetching usage:", err)
		} else if len(usage.Items) > 0 {
			fmt.Printf("Cost for the request: %.2f\n", usage.Items[0].Cost)
			usageFound = true
		} else {
			fmt.Println("Usage details not found. Retrying in 5 seconds...")
		}

		time.Sleep(5 * time.Second)
	}
}