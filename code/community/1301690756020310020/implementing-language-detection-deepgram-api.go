package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

func main() {
	apiKey := os.Getenv("DEEPGRAM_API_KEY")

	audioData, err := ioutil.ReadFile("your_audio_file.mp3")
	if err != nil {
		panic(err)
	}

	url := "https://api.deepgram.com/v1/listen?detect_language=true"

	req, err := http.NewRequest("POST", url, bytes.NewReader(audioData))
	if err != nil {
		panic(err)
	}

	req.Header.Set("Authorization", fmt.Sprintf("Token %s", apiKey))
	req.Header.Set("Content-Type", "audio/mpeg")

	client := &http.Client{}
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