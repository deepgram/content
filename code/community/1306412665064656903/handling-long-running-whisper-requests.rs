// Rust code to check for job status using Deepgram API
// Add deepgram-rust-sdk crate in your Cargo.toml
// To run, replace placeholders with real values

use deepgram::Deepgram;
use std::env;

#[tokio::main]
async fn main() {
    // Get API key from environment variable
    let api_key = env::var("DEEPGRAM_API_KEY").expect("API key not set");

    // Set Job ID
    let job_id = "your-job-id";

    // Create Deepgram client
    let client = Deepgram::builder().api_key(api_key).build();

    // Check job status
    match client.get_transcription_status(job_id).await {
        Ok(job_status) => {
            println!("Job status: {:?}", job_status);
            // Handle job status accordingly
        }
        Err(e) => eprintln!("Error: {:?}", e),
    }
}