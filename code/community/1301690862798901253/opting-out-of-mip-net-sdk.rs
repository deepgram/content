use deepgram::Deepgram;
use std::collections::HashMap;
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY must be set");
    let audio_url = "YOUR_AUDIO_FILE_URL"; // Replace with your audio file URL

    let mut options = HashMap::new();
    // Adding custom parameters
    options.insert("mip_opt_out", "true");

    let deepgram = Deepgram::new(api_key);
    let response = deepgram.transcription().prerecorded().transcribe(audio_url, options).await?;

    println!("Success: {:#?}", response);

    Ok(())
}