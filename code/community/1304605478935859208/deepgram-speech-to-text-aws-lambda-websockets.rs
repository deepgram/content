use deepgram::Deepgram;
use std::env;

#[tokio::main]
async fn main() {
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY must be set");
    let file_path = "path/to/your/audiofile.wav";

    let dg_client = Deepgram::new(api_key);
    let options = deepgram::TranscriptionOptions::builder()
        .endpoint("https://api.deepgram.com/v1/listen")
        .build();

    match dg_client.transcribe(&options, file_path).await {
        Ok(transcription) => println!("Transcription: {:#?}", transcription),
        Err(e) => eprintln!("Error: {:#?}", e),
    }
}
