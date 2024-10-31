package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "os"
)

func main() {
    apiKey := os.Getenv("DEEPGRAM_API_KEY")
    url := "https://api.deepgram.com/v1/speak"

    textToSpeak := "Hello, world!"

    requestBody, err := json.Marshal(map[string]string{
        "text": textToSpeak,
        "voice": "en-US",
    })
    if err != nil {
        panic(err)
    }

    client := &http.Client{}
    request, err := http.NewRequest("POST", url, bytes.NewBuffer(requestBody))
    if err != nil {
        panic(err)
    }

    request.Header.Set("Authorization", fmt.Sprintf("Bearer %s", apiKey))
    request.Header.Set("Content-Type", "application/json")

    response, err := client.Do(request)
    if err != nil {
        panic(err)
    }
    defer response.Body.Close()

    if response.StatusCode == http.StatusOK {
        fmt.Println("Text-to-Speech executed successfully")
    } else {
        fmt.Println("Failed to execute Text-to-Speech")
    }
}