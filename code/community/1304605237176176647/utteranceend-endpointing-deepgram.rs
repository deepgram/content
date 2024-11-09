// Rust example using WebSockets and `tungstenite` to connect to Deepgram's transcription endpoint

use std::env;
use tungstenite::{connect, Message};
use url::Url;

fn main() {
    // Load Deepgram API key from environment variable
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY not set");
    // The Deepgram Live Transcription WebSocket endpoint
    let url = Url::parse(&format!("wss://api.deepgram.com/v1/listen?endpointing=800&utterance_end_ms=2000")).unwrap();

    let (mut socket, _response) = connect(url).expect("Failed to connect");

    // Send the authorization token to authenticate
    let auth_msg = format!("{{ \"type\": \"auth \"authorization\": \"Token {}" }}", api_key);
    socket.write_message(Message::Text(auth_msg)).unwrap();

    // Not an actual audio stream for example purposes
    // This would typically be a stream of audio bytes
    let dummy_audio_data = vec![1, 2, 3, 4, 5];
    socket.write_message(Message::Binary(dummy_audio_data)).unwrap();

    loop {
        let msg = socket.read_message().expect("Error reading message").into_text().unwrap();
        if msg.contains("speech_final": true) {
            println!("Speech has ended based on speech_final flag.");
        } else if msg.contains("UtteranceEnd") {
            println!("Utterance has ended with no preceding speech_final.");
        }
    }
}
// Reference: https://docs.rs/tungstenite/0.14.0/tungstenite/