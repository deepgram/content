use std::env;
use reqwest::{Client, Error};
use serde_json::json;

#[tokio::main]
async fn main() -> Result<(), Error> {
    // Set the API key from environment variables
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY not set");
    
    // Set the API endpoint
    let api_endpoint = "https://api.deepgram.com/v1/speak";

    // Construct text with phonetic spelling to improve pronunciation
    let text = "Prasanna (p-r-ah-s-a-n-n-a), Mangesh (m-uh-ng-ey-sh), Anil (ah-n-ee-l) are example names.";
    
    // JSON payload
    let payload = json!({
        "text": text,
        "voice": "en-US" // Assuming the use of a US voice model
    });

    // Create an HTTP client
    let client = Client::new();

    // Send POST request to Deepgram TTS API
    let response = client.post(api_endpoint)
        .bearer_auth(api_key)
        .json(&payload)
        .send()
        .await?;

    // Check if the response is success
    if response.status().is_success() {
        println!("Audio generated successfully.");
    } else {
        println!("Failed to generate audio: {}", response.status());
    }

    Ok(())
}