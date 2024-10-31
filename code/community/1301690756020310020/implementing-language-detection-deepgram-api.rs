use std::env;
use reqwest::blocking::Client;
use serde_json::json;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let deepgram_api_key = env::var("DEEPGRAM_API_KEY")?;

    let client = Client::new();

    let response = client.post("https://api.deepgram.com/v1/listen")
        .header("Authorization", format!("Token {}", deepgram_api_key))
        .header("Content-Type", "audio/mpeg")
        .query(&[("detect_language", "true")])
        // Add audio data, e.g., .body(your_audio_data)
        .send()?;

    let json_response: serde_json::Value = response.json()?;
    println!("Response: {}", serde_json::to_string_pretty(&json_response)?);

    Ok(())
}