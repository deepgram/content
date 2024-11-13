use std::env;
use reqwest::header::{AUTHORIZATION, CONTENT_TYPE};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY not set");
    let audio_url = env::var("AUDIO_URL").expect("AUDIO_URL not set");

    let client = reqwest::Client::new();
    let response = client.post("https://api.deepgram.com/v1/listen")
        .header(AUTHORIZATION, format!("Token {}", api_key))
        .header(CONTENT_TYPE, "application/json")
        .json(&serde_json::json!({
            "url": audio_url,
            "diarize": true,
        }))
        .send()
        .await?;

    let result: serde_json::Value = response.json().await?;
    println!("Transcription result: {:?}", result);

    Ok(())
}