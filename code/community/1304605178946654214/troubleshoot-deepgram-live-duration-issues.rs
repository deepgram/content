use deepgram::{Deepgram, DeepgramLiveTranscriptionOptions};
use tokio_stream::StreamExt;
use std::{env, error::Error};

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let api_key = env::var("DEEPGRAM_API_KEY")?;
    let audio_file_path = env::var("AUDIO_FILE_PATH")?;

    // Initialize Deepgram with API Key
    let deepgram = Deepgram::new(api_key);

    // Configure the options for real-time transcription
    let options = DeepgramLiveTranscriptionOptions {
        punctuate: true,
        ..Default::default()
    };

    // Start a new live transcription session
    let mut stream = deepgram.live_transcription(audio_file_path, options).await?;

    // Process audio stream
    while let Some(transcript_result) = stream.next().await {
        match transcript_result {
            Ok(transcript) => println!("Transcript: {:?}", transcript),
            Err(e) => eprintln!("Error: {}", e),
        }
    }

    Ok(())
}