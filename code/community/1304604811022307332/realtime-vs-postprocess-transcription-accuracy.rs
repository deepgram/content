use std::env;
use deepgram::DeepgramClient;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    // Configure your Deepgram API Key via an environment variable
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY must be set");

    // Create a new Deepgram client
    let client = DeepgramClient::new(api_key);  

    // Here, specify your audio source for transcription post-process
    let audio_url = "https://example.com/audio.wav";

    // Options for the transcription request
    let options = deepgram::TranscriptionOptions {
        punctuate: Some(true),
        language: Some("en"),
        ..Default::default()
    };

    // Transcribe the audio (pre-recorded)
    let response = client.transcription_listen(audio_url, options).await?;

    // Print the transcription result
    println!("Final transcription: {}", response);

    Ok(())
}