// Rust example for using Deepgram's real-time streaming API with keyword boosting
// Requires the `deepgram` and `tokio` crates

use deepgram::{Deepgram, DeepgramKey};
use tokio::main;
use uuid::Uuid;

#[main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Retrieve your Deepgram API key from an environment variable
    let api_key = std::env::var("DEEPGRAM_API_KEY")?;

    // Initialize Deepgram client
    let dg = Deepgram::new(DeepgramKey::Key(api_key));

    // Define parameters for real-time transcription with keyword boosting
    let options = deepgram::transcription::TranscriptionOptions {
        keywords: Some(vec!["JAY", "HAYWIRE"].into_iter().map(|k| k.to_string()).collect()),
        ..Default::default()
    };

    // Connect to the websocket for live transcriptions
    let uuid = Uuid::new_v4();
    let mut stream = dg.transcription().real_time(uuid.to_string(), options).await?;

    // Listen for transcriptions
    while let Some(Ok(message)) = stream.next().await {
        println!("Transcript: {}", message.text);
    }

    Ok(())
}

// Note: Example assumes that you're streaming audio to the websocket
// For environment setup instructions, refer to the official Deepgram documentation.