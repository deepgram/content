use deepgram::{Deepgram, ListenParams};
use std::fs;
use std::env;

#[tokio::main]
async fn main() {
    // Load your Deepgram API key from environment variables
    let dg_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY not set");

    // Prepare your audio file
    let audio_path = "path/to/your/audio/file.mp3";
    let audio_data = fs::read(audio_path).expect("Failed to read audio file");

    // Create a Deepgram client
    let deepgram = Deepgram::builder(&dg_key).build().unwrap();

    // Set the parameters for transcription
    let params = ListenParams::builder().language("en-US").build();

    // Send the audio data for transcription
    match deepgram.listen(audio_data, params).await {
        Ok(response) => println!("Transcription: {}", response.transcript().unwrap_or("")),
        Err(e) => println!("Error: {}", e),
    }
}

// Note: Remember to replace "path/to/your/audio/file.mp3" with the actual path to your MP3 file. This code assumes you have installed the `deepgram` Rust crate (fictional in this context). The example demonstrates how to read a file and send it for transcription using Deepgram's raw binary format. Consult actual Rust library documentation for accurate usage if available.