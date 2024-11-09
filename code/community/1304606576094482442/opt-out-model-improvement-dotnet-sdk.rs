// Rust does not have an official Deepgram SDK, but we can use an HTTP client like `reqwest`.
// This example uses env variables and async runtime.

use reqwest::Client;
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load environment variables
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY not set");
    let file_url = env::var("AUDIO_FILE_URL").expect("AUDIO_FILE_URL not set");

    // URL for Deepgram API
    let url = "https://api.deepgram.com/v1/listen?mip_opt_out=true";

    // Making the request
    let client = Client::new();
    let response = client
        .post(url)
        .header("Authorization", format!("Token {}", api_key))
        .header("Content-Type", "application/json")
        .body(format!("{{\"url\": \"{}\"}}", file_url))
        .send()
        .await?;

    // Check response
    if response.status().is_success() {
        let result: serde_json::Value = response.json().await?;
        println!("Response: {:?}", result);
    } else {
        println!("Failed to transcribe audio: {}", response.status());
    }

    Ok(())
}