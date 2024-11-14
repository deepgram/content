use std::fs::File;
use std::io::Read;
use std::env;
use deepgram::DeepgramClient;
use deepgram::types::TranscriptionOptions;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let file_path = "./audio-file.wav"; // Path to your audio file
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY must be set");

    // Create Deepgram client
    let deepgram = DeepgramClient::new(api_key);

    // Read audio file
    let mut file = File::open(file_path)?;
    let mut audio_data = Vec::new();
    file.read_to_end(&mut audio_data)?;

    // Set transcription options
    let options = TranscriptionOptions {
        language: Some("en-US"),
        ..Default::default()
    };

    // Request transcription
    let response = deepgram.transcribe_audio(&audio_data, "audio/wav", options)?;

    // Print the transcription
    println!("Transcription: {}", response.results.channel(0).unwrap().alternatives.first().unwrap().transcript);

    Ok(())
}