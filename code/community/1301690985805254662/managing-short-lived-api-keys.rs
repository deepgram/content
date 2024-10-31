use std::env;
use deepgram::{Deepgram, DeepgramError};

fn main() -> Result<(), DeepgramError> {
    // Fetch API key from environment variables
    let api_key = env::var("DEEPGRAM_API_KEY").expect("DEEPGRAM_API_KEY not set");
    
    // Create a new Deepgram client
    let client = Deepgram::new(api_key);

    // Sample logic to delete key after use
    let key_id = env::var("DEEPGRAM_KEY_ID").expect("DEEPGRAM_KEY_ID not set");
    
    // Assume the key is used prior in logic
    delete_api_key(&client, &key_id)?;

    Ok(())
}

fn delete_api_key(client: &Deepgram, key_id: &str) -> Result<(), DeepgramError> {
    // Logic to delete or disable the key
    // Note: Actual implementation depends on Deepgram SDK support for key management
    println!("Deleting key with id: {}", key_id);
    Ok(())
}

// This code assumes the existence of the hypothetical function `delete_api_key`
// It should be replaced by actual key management logic when supported.