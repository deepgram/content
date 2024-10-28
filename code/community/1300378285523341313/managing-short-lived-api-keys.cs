using System;
using System.Net.Http;
using System.Threading.Tasks;

public class ApiKeyManager
{
    private static readonly HttpClient client = new HttpClient();

    public static async Task<string> RequestApiKeyAsync()
    {
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {Environment.GetEnvironmentVariable("ADMIN_API_KEY")}");
        HttpResponseMessage response = await client.PostAsync("https://api.your-service.com/generate-key", null);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }

    public static async Task DeleteApiKeyAsync(string apiKey)
    {
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {Environment.GetEnvironmentVariable("ADMIN_API_KEY")}");
        HttpResponseMessage response = await client.DeleteAsync($"https://api.your-service.com/delete-key/{apiKey}");
        response.EnsureSuccessStatusCode();
    }

    public static async Task Main(string[] args)
    {
        string apiKey = await RequestApiKeyAsync();
        Console.WriteLine($"API Key: {apiKey}");

        // Use the API key...

        await DeleteApiKeyAsync(apiKey);
    }
}

// Ensure to set ADMIN_API_KEY in your environment variables.