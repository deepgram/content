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
	if apiKey == "" {
		fmt.Println("DEEPGRAM_API_KEY environment variable must be set.")
		return
	}

	audioFilePath := "your_audio_file_path.wav"
	audioData, err := ioutil.ReadFile(audioFilePath)
	if err != nil {
		fmt.Println("Error reading audio file:", err)
		return
	}

	url := "https://api.deepgram.com/v1/listen"
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(audioData))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	req.Header.Set("Authorization", "Token "+apiKey)
	req.Header.Set("Content-Type", "audio/wav")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error making request:", err)
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return
	}

	if resp.StatusCode == http.StatusOK {
		fmt.Println("Transcription results:", string(body))
	} else {
		fmt.Printf("Error: %d - %s\n", resp.StatusCode, string(body))
	}
}