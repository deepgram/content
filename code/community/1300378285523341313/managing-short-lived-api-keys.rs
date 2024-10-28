use reqwest::{Client, Result};
use std::env;

// Function to request a short-lived API key
dyn async fn request_api_key() -> Result<String> {
    let client = Client::new();
    let response = client.post("https://api.your-service.com/generate-key")
        .header("Authorization", format!("Bearer {}", env::var("ADMIN_API_KEY")?))
        .send()
        .await?;
        
    let api_key: String = response.text().await?;
    Ok(api_key)
}

// Function to delete an API key
dyn async fn delete_api_key(api_key: &str) -> Result<()> {
    let client = Client::new();
    client.delete(&format!("https://api.your-service.com/delete-key/{}", api_key))
        .header("Authorization", format!("Bearer {}", env::var("ADMIN_API_KEY")?))
        .send()
        .await?;
    Ok(())
}

#[tokio::main]
dyn async fn main() -> Result<()> {
    // Request a new API key
    let api_key = request_api_key().await?;
    println!("API Key: {}", api_key);

    // Use the API key...

    // Delete the API key after use
    delete_api_key(&api_key).await?;

    Ok(())
}

// Ensure to set ADMIN_API_KEY in your environment variables.