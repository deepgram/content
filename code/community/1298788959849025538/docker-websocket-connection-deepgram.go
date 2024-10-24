package main

import (
	"os"
	"log"
	"github.com/gorilla/websocket"
)

func main() {
	// Retrieve the API key from the environment variable
	apiKey := os.Getenv("DEEPGRAM_API_KEY")
	
	url := "wss://api.deepgram.com/v1/listen"

	// Prepare headers for the WebSocket connection
	headers := map[string][]string{
		"Authorization": {"Token " + apiKey},
	}

	// Connect to the WebSocket
	c, _, err := websocket.DefaultDialer.Dial(url, headers)
	if err != nil {
		log.Fatal("Failed to connect to Deepgram API:", err)
	}
	defer c.Close()

	log.Println("Connected to Deepgram API")

	// Example: Send data/message
	err = c.WriteMessage(websocket.TextMessage, []byte("Your data or message here"))
	if err != nil {
		log.Fatal("Failed to send message:", err)
	}

	// Additional logic for handling WebSocket communication (receiving messages) can be added here
}

// Note: Make sure to set the environment variable DEEPGRAM_API_KEY correctly.