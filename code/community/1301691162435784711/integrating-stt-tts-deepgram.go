package main

import (
	"os"
	"fmt"
	"log"
	"golang.org/x/net/websocket"
)

func main() {
	sttUrl := "wss://api.deepgram.com/v1/listen"
	ttsUrl := "wss://api.deepgram.com/v1/speak"
	apiKey := os.Getenv("DEEPGRAM_API_KEY")

	headers := websocket.Config{
		Location: websocket.ParseLocation(sttUrl),
		Origin:   websocket.ParseLocation("https://api.deepgram.com"),
		Header: websocket.Header{
			"Authorization": {"Token " + apiKey},
		},
	}

	// STT connection
	sttConn, err := websocket.DialConfig(&headers)
	if err != nil {
		log.Fatal(err)
	}
	defer sttConn.Close()

	fmt.Println("STT WebSocket Connection Opened")

	sttMessage := "{\"content-type\": \"audio/wav\", \"interim_results\": true}"
	websocket.Message.Send(sttConn, sttMessage)

	var sttReply string
	websocket.Message.Receive(sttConn, &sttReply)
	fmt.Println("STT Received:", sttReply)

	// TTS connection
	ttsConn, err := websocket.DialConfig(&headers)
	if err != nil {
		log.Fatal(err)
	}
	defer ttsConn.Close()

	fmt.Println("TTS WebSocket Connection Opened")

	ttsMessage := "Hello, this is a text-to-speech demo."
	websocket.Message.Send(ttsConn, ttsMessage)

	var ttsReply string
	websocket.Message.Receive(ttsConn, &ttsReply)
	fmt.Println("TTS Received:", ttsReply)
}