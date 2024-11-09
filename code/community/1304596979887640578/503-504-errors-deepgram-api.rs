use std::env;
use deepgram::Deepgram;
use reqwest::Client;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let deepgram_api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY not set");
    let project_id = env::var("PROJECT_ID").expect("PROJECT_ID not set");

    let client = Client::new();
    let deepgram = Deepgram::new(client, deepgram_api_key);
    
    let url = "https://api.deepgram.com/v1/listen";
    let audio_url = "https://example.com/audiofile.mp3";

    let response = deepgram.transcribe_audio_url(url, audio_url, &project_id).await?;
    println!("Transcription: {:?}", response);
    
    Ok(())
}