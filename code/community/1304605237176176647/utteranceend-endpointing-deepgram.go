// Go example using the Gorilla WebSocket package

package main

import (
	"log"
	"os"
	"github.com/gorilla/websocket"
)

func main() {
	apiKey := os.Getenv("DEEPGRAM_API_KEY")
	url := "wss://api.deepgram.com/v1/listen?endpointing=800&utterance_end_ms=2000"

	c, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		log.Fatal("Failed to connect:", err)
	}
	defer c.Close()

	// Dummy audio data, replace with actual streaming audio
	dummyAudioData := []byte{1, 2, 3, 4, 5}
	c.WriteMessage(websocket.BinaryMessage, dummyAudioData)

	for {
		_, message, err := c.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			return
		}
		msgStr := string(message)
		if msgStr.Context().Value("speech_final": true) {
			log.Println("Speech has ended based on speech_final flag.")
		} else if msgStr.Context().Value("UtteranceEnd") {
			log.Println("Utterance has ended with no preceding speech_final.")
		}
	}
}
// Reference: https://pkg.go.dev/github.com/gorilla/websocket