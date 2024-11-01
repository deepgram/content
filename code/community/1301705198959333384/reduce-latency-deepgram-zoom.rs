use deepgram::DeepgramClient;
use std::env;
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    // Set your Deepgram API key as an environment variable
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY not set");

    // Create a new Deepgram client
    let client = DeepgramClient::new(api_key);

    // URL of the audio stream
    let audio_url = "your-zoom-websocket-url";

    // Additional options can be set here
    let options = deepgram::ListenOptions {
        punctuate: Some(true),
        interim_results: Some(true),
        ..Default::default()
    };

    // Listen to the audio stream and handle incoming transcripts
    let mut stream = client.listen_with_options(audio_url, options).await.expect("Error creating stream");

    while let Some(result) = stream.next().await {
        match result {
            Ok(event) => {
                println!("Transcript: {}", event.transcript);
            }
            Err(err) => {
                eprintln!("An error occurred: {}", err);
            }
        }
    }
}

// For more details, you can refer to the Deepgram Rust SDK documentation.