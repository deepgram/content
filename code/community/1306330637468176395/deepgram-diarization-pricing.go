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
    audioUrl := os.Getenv("AUDIO_URL")

    payload := map[string]interface{}{
        "url": audioUrl,
        "diarize": true,
    }

    jsonPayload, _ := json.Marshal(payload)

    req, err := http.NewRequest("POST", "https://api.deepgram.com/v1/listen", bytes.NewBuffer(jsonPayload))
    if err != nil {
        fmt.Println("Error creating request:", err)
        return
    }

    req.Header.Set("Authorization", fmt.Sprintf("Token %s", apiKey))
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error making request:", err)
        return
    }

    defer resp.Body.Close()
    body, _ := ioutil.ReadAll(resp.Body)

    fmt.Println("Transcription result:", string(body))
}