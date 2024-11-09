package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "os"
)

func main() {
    deepgramApiKey := os.Getenv("DEEPGRAM_API_KEY")
    projectId := os.Getenv("PROJECT_ID")

    url := "https://api.deepgram.com/v1/listen"
    audioUrl := "https://example.com/audiofile.mp3"

    requestBody, _ := json.Marshal(map[string]string{
        "url":     audioUrl,
        "project": projectId,
    })

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(requestBody))
    if err != nil {
        fmt.Println("Error creating request:", err)
        return
    }

    req.Header.Set("Authorization", "Token "+deepgramApiKey)
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error making HTTP request:", err)
        return
    }
    defer resp.Body.Close()

    if resp.StatusCode == http.StatusOK {
        var result map[string]interface{}
        json.NewDecoder(resp.Body).Decode(&result)
        fmt.Println("Transcription:", result)
    } else {
        fmt.Printf("Error: %s\n", resp.Status)
    }
}