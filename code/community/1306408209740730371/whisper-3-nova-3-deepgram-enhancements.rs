// Import necessary crates
use std::env;
use std::io::Read;

// Add dependencies in Cargo.toml
// [dependencies]
// reqwest = { version = "0.11", features = ["blocking"] }
// tokio = { version = "1", features = ["full"] }

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Fetch Deepgram API key from environment variables
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY must be set");
    let url = "https://api.deepgram.com/v1/listen";

    // Prepare the audio file
    let audio_path = "your_audio_file_path.wav";
    let mut audio_file = std::fs::File::open(audio_path)?;
    let mut audio_data = Vec::new();
    audio_file.read_to_end(&mut audio_data)?;

    // Make HTTP request
    let client = reqwest::Client::new();
    let response = client.post(url)
        .header("Authorization", format!("Token {}", api_key))
        .header("Content-Type", "audio/wav")
        .body(audio_data)
        .send()
        .await?;

    // Parse the JSON response
    let response_text = response.text().await?;
    println!("Response: {}", response_text);

    Ok(())
}