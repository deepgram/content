use std::collections::HashMap;
use reqwest::{Client, Error};
use std::env;

#[tokio::main]
async fn main() -> Result<(), Error> {
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY not set");
    let audio_url = "https://your-audio-file-url.com/audio.wav";

    let client = Client::new();
    let mut headers = HashMap::new();
    headers.insert("Authorization", format!("Token {}", api_key));

    let response = client.post("https://api.deepgram.com/v1/listen")
        .headers(headers.into_iter().collect())
        .query(&[
            ("diarize", "true"),
            ("punctuate", "true")
        ])
        .body(audio_url)
        .send()
        .await?;

    let response_text = response.text().await?;
    println!("Response: {}", response_text);

    Ok(())
}