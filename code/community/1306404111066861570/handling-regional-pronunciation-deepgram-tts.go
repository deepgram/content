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
    // Set your Deepgram API key as an environment variable before running the script
    apiKey := os.Getenv("DEEPGRAM_API_KEY")

    url := "https://api.deepgram.com/v1/speak"

    // Define the structure of our request payload
    textPayload := map[string]string{
        "text": "Hello, this is a test pronunciation of the name SpellingAlteration.",
    }

    jsonPayload, err := json.Marshal(textPayload)
    if err != nil {
        fmt.Println("Error marshalling JSON:", err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
    if err != nil {
        fmt.Println("Error creating request:", err)
        return
    }

    req.Header.Set("Authorization", "Token "+apiKey)
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error sending request:", err)
        return
    }
    defer resp.Body.Close()

    if resp.StatusCode == http.StatusOK {
        body, _ := ioutil.ReadAll(resp.Body)
        fmt.Println("Request successful!\n", string(body))
    } else {
        fmt.Printf("Request failed. Status: %s\n", resp.Status)
    }
}