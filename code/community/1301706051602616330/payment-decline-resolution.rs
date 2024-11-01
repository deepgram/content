use std::env;
use deepgram::Client;

async fn main() {
    let api_key = env::var("DEEPGRAM_API_KEY").expect("Please set the API key in the environment");
    let client = Client::new(api_key);

    let response = client.transcribe_url("https://api.deepgram.com/v1/listen", "https://storage.googleapis.com/deepgram-demos/voicemail.mp3", None).await;

    match response {
        Ok(transcription) => println!("Transcription: {:?}", transcription),
        Err(e) => eprintln!("Error: {}", e),
    }
}