use std::env;
use hyper::{Body, Client, Request};
use hyper_tls::HttpsConnector;
use tokio;

// To run this example, add dependencies in Cargo.toml:
//
// [dependencies]
// hyper = "0.14"
// hyper-tls = "0.5"
// tokio = { version = "1", features = ["full"] }

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    // Load the API key from the environment variables
    let api_key = env::var("DEEPGRAM_API_KEY")?;

    // Set up the HTTPS connector
    let https = HttpsConnector::new();
    let client = Client::builder().build::<_, hyper::Body>(https);

    // Create the URI for the TTS API
    let uri = "https://api.deepgram.com/v1/speak".parse()?;

    // Define the JSON payload for the request
    let json_payload = r#"{
        "text": "Hello, this is a test pronunciation of the name SpellingAlteration."
    }"#;

    // Create the request with headers
    let req = Request::post(uri)
        .header("Authorization", format!("Token {}
", api_key))
        .header("Content-Type", "application/json")
        .body(Body::from(json_payload))?;

    // Send the request and collect the response
    let res = client.request(req).await?;

    println!("Response: {}", res.status());

    Ok(())
}