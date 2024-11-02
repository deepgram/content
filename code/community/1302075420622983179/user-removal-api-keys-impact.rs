use reqwest::{Client, Error};
use std::env;

#[tokio::main]
async fn main() -> Result<(), Error> {
    // Load the API key from the environment variable
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY not set");

    // Configuring the API endpoint
    let url = "https://api.deepgram.com/v1/listen";

    // Create a new HTTP client
    let client = Client::new();

    // Make the HTTP POST request
    let response = client
        .post(url)
        .bearer_auth(api_key)
        .send()
        .await?;

    // Check the status and print the response text
    if response.status().is_success() {
        println!("Response: {:?}", response.text().await?);
    } else {
        eprintln!("Request failed with status: {}", response.status());
    }

    Ok(())
}

// NOTE: Before running, ensure you have set the DEEPGRAM_API_KEY environment variable.
// Run with: DEEPGRAM_API_KEY=your_api_key_here cargo run