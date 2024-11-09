package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

func main() {
	apiKey := os.Getenv("DEEPGRAM_API_KEY")
	audioUrl := "https://your-audio-file-url.com/audio.wav"

	client := &http.Client{}
	
	requestBody, err := json.Marshal(map[string]interface{}{
		"url":       audioUrl,
		"diarize":   true,
		"punctuate": true,
	})
	if err != nil {
		panic(err)
	}

	req, err := http.NewRequest("POST", "https://api.deepgram.com/v1/listen", bytes.NewBuffer(requestBody))
	if err != nil {
		panic(err)
	}

	req.Header.Set("Authorization", fmt.Sprintf("Token %s", apiKey))
	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	fmt.Println(string(body))
}