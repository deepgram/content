use std::env;
use deepgram::{Deepgram, LiveTranscriptionOptions};
use tokio;

#[tokio::main]
async fn main() {
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY must be set");

    let options = LiveTranscriptionOptions {
        punctuate: true,
        encoding: "mulaw".into(),
        channels: Some(2),
        sample_rate: Some(8000),
        multichannel: Some(true) // Ensure multichannel is set to true for multiple channels
    };

    let deepgram = Deepgram::new(&api_key);

    match deepgram.start_live_transcription(options).await {
        Ok(response) => println!("Live transcription started successfully: {:?}", response),
        Err(e) => eprintln!("Error starting live transcription: {:?}", e),
    }
}

// For more about multichannel setup, refer to: https://developers.deepgram.com/docs/multichannel