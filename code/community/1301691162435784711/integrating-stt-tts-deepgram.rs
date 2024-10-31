use std::env;
use std::error::Error;
use websocket::{ClientBuilder, Message};
use std::thread;
use std::io::Write;

fn main() -> Result<(), Box<dyn Error>> {
    let stt_url = "wss://api.deepgram.com/v1/listen";
    let tts_url = "wss://api.deepgram.com/v1/speak";
    let api_key = env::var("DEEPGRAM_API_KEY")?;

    // Connect to the STT WebSocket
    let stt_client = ClientBuilder::new(stt_url)?
        .add_protocol("rust-websocket")
        .connect_secure(Some(websocket::sync::NativeTlsSettings::default()))?;
    
    stt_client.send_message(&Message::text("{\"content-type\": \"audio/wav\", \"interim_results\": true}"))?;

    // Keep the connection open while processing
    let (mut receiver, mut sender) = stt_client.split()?;

    thread::spawn(move || {
        for message in receiver.incoming_messages() {
            match message {
                Ok(message) => match message {
                    Message::Text(txt) => println!("Received: {}", txt),
                    _ => {}
                },
                Err(e) => eprintln!("Error: {:#?}", e),
            }
        }
    });

    // Example TTS management (assuming TTS state is managed similarly)
    let tts_client = ClientBuilder::new(tts_url)?
        .add_protocol("rust-websocket")
        .connect_secure(Some(websocket::sync::NativeTlsSettings::default()))?;
    
    // For TTS, send a message to play text
    let tts_text = "Hello, this is a test of Text-to-Speech API.";
    tts_client.send_message(&Message::text(tts_text))?;

    std::io::stdout().flush()?;

    Ok(())
}