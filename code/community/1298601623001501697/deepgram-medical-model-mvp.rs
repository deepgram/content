use deepgram_rs::Deepgram;
use futures_util::StreamExt;
use std::env;
use tokio::runtime::Runtime;

fn main() {
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY must be set");
    let model = "nova-2-medical";

    let rt = Runtime::new().unwrap();
    rt.block_on(async move {
        let deepgram = Deepgram::new(api_key);

        let audio_url = "<YOUR_AUDIO_URL_HERE>";

        match deepgram.transcribe_streaming(audio_url, model).await {
            Ok(mut response) => {
                while let Some(result) = response.next().await {
                    match result {
                        Ok(transcript) => {
                            println!("Transcript: {}", transcript.alternatives[0].transcript);
                        }
                        Err(err) => {
                            eprintln!("Error: {:?}", err);
                            break;
                        }
                    }
                }
            }
            Err(e) => {
                println!("Failed to start transcription: {}", e);
            }
        }
    });
}