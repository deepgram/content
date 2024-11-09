use deepgram_sdk::{Deepgram, UsageClient, TranscriptionClient};
use std::env;
use tokio;
use std::time::Duration;

#[tokio::main]
async fn main() {
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY not set");
    let project_id = env::var("PROJECT_ID").expect("PROJECT_ID not set");
    let file_path = "path/to/your/file.wav";  // Make sure to replace this with your actual file path

    let dg_client = Deepgram::new(api_key).await.expect("Failed to create Deepgram client");

    // Initiating transcription
    let transcription_client = TranscriptionClient::new(dg_client.clone());
    let result = transcription_client.transcribe_file(file_path, &Default::default()).await.expect("Failed to transcribe file");
    let request_id = result.metadata.request_id;
    println!("Transcription done, request_id: {}", request_id);

    // Retrieve usage cost with retries
    let usage_client = UsageClient::new(dg_client);
    loop {
        match usage_client.get_usage_request(&project_id, &request_id).await {
            Ok(usage) => {
                if let Some(cost) = usage.items.first() {
                    println!("Cost for the request: {}", cost.cost);
                    break;
                }
            },
            Err(e) => {
                println!("Error fetching usage: {}. Retrying in 5 seconds...
", e);
            },
        }
        tokio::time::sleep(Duration::from_secs(5)).await;
    }
}

// Note: Use `cargo.toml` to add dependencies for deepgram_sdk and tokio