package main

import (
    "bufio"
    "fmt"
    "log"
    "net/url"
    "os"
    "os/signal"
    "syscall"

    "github.com/gorilla/websocket"
    "github.com/joho/godotenv"
)

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    apiKey := os.Getenv("DEEPGRAM_API_KEY")
    u := url.URL{Scheme: "wss", Host: "api.deepgram.com", Path: "/v1/listen", RawQuery: "model=multi"}
    headers := make(map[string][]string)
    headers["Authorization"] = []string{"Token " + apiKey}

    c, _, err := websocket.DefaultDialer.Dial(u.String(), headers)
    if err != nil {
        log.Fatal("dial:", err)
    }
    defer c.Close()

    done := make(chan struct{})

    go func() {
        defer close(done)
        for {
            _, message, err := c.ReadMessage()
            if err != nil {
                log.Println("read:", err)
                return
            }
            fmt.Printf("Received: %s\n", message)
        }
    }()

    msg := "Your audio stream chunk here" // replace with actual audio data
    c.WriteMessage(websocket.TextMessage, []byte(msg))

    interrupt := make(chan os.Signal, 1)
    signal.Notify(interrupt, syscall.SIGINT, syscall.SIGTERM)

    <-interrupt

    fmt.Println("interrupt")

    // Cleanly close the connection by sending a close message and then
    // waiting (with timeout) for the server to close the connection.
    err = c.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, ""))
    if err != nil {
        log.Println("write close:", err)
        return
    }

    select {
    case <-done:
    case <-interrupt:
    }

    c.Close()
}

// Ensure .env file is present with DEEPGRAM_API_KEY
// Replace "Your audio stream chunk here" with actual data