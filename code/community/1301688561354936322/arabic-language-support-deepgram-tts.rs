use std::env;
use reqwest::Client;
use serde_json::json;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load the Deepgram API key from an environment variable
    let api_key = env::var("DEEPGRAM_API_KEY")?;
    let url = "https://api.deepgram.com/v1/speak";

    let client = Client::new();
    let text_to_speak = "Hello, world!";
    let audio_config = json!({
        "text": text_to_speak,
        "voice": "en-US"
    });

    let response = client.post(url)
        .bearer_auth(api_key)
        .json(&audio_config)
        .send()
        .await?;

    if response.status().is_success() {
        println!("Text-to-Speech executed successfully");
    } else {
        println!("Failed to execute Text-to-Speech");
    }
    
    Ok(())
}