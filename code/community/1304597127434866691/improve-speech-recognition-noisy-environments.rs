use deepgram::{Deepgram, Credentials, TranscriptionOptions, TranscriptionResponse};
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load environment variables
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY not set");
    let audio_url = env::var("AUDIO_URL").expect("AUDIO_URL not set");

    // Create Deepgram instance
    let deepgram = Deepgram::new(Credentials::ApiKey(api_key));

    // Set transcription options with noise filtering
    let options = TranscriptionOptions::default().noise_filter(true);

    // Request transcription
    let response: TranscriptionResponse = deepgram.transcribe_url(&audio_url, Some(options)).await?;

    // Output the transcription
    println!("Transcription: {}", response.transcript());

    Ok(())
}