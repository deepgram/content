use std::env;
use reqwest::{Client, Error};

#[tokio::main]
async fn main() -> Result<(), Error> {
    // Setting up environment variables
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY not set");
    let audio_url = env::var("AUDIO_URL").expect("AUDIO_URL not set");
    
    // Create a client
    let client = Client::new();

    // Make the request
    let response = client.post("https://api.deepgram.com/v1/listen")
        .header("Authorization", format!("Token {}", api_key))
        .header("Content-Type", "application/json")
        .query(&["diarize", "true"]) // Enable diarization
        .json(&serde_json::json!({ "url": audio_url }))
        .send()
        .await?;

    // Print the response text
    let response_text = response.text().await?;
    println!("{}", response_text);

    Ok(())
}