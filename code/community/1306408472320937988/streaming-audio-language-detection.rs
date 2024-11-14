extern crate dotenv;
extern crate tungstenite;

use std::env;
use tungstenite::{connect, Message};
use url::Url;

fn main() {
    // Load environment variables from a .env file
    dotenv::dotenv().ok();

    // Set Deepgram API key and endpoint
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY not set");
    let endpoint = "wss://api.deepgram.com/v1/listen?model=multi";

    // Connect to Deepgram's WebSocket API
    let (mut socket, response) = 
        connect(Url::parse(endpoint).unwrap()).expect("Can't connect");

    println!("Connected to the server");
    println!("Response:
{:?}", response);

    // Your audio stream should go here
    // For demonstration purposes, we're sending a text message
    let message = "Your audio stream chunk here";
    socket.send(Message::Text(message.into())).unwrap();

    // Receive the response
    let msg = socket.read_message().expect("Error reading message");
    println!("Received: {:?}", msg);

    // Close the connection
    socket.close(None).unwrap();
}

/*
This example demonstrates a basic setup for streaming audio to Deepgram's live transcription API using Rust.
Replace "Your audio stream chunk here" with your actual audio data.
Make sure to set DEEPGRAM_API_KEY in your environment variables.
*/