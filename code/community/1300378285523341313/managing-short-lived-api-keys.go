package main

import (
	"fmt"
	"net/http"
	"os"
	"io/ioutil"
)

// Function to request a short-lived API key
func requestApiKey() (string, error) {
	request, err := http.NewRequest("POST", "https://api.your-service.com/generate-key", nil)
	if err != nil {
		return "", err
	}
	request.Header.Add("Authorization", "Bearer "+os.Getenv("ADMIN_API_KEY"))

	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		return "", err
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}

// Function to delete an API key
func deleteApiKey(apiKey string) error {
	request, err := http.NewRequest("DELETE", "https://api.your-service.com/delete-key/"+apiKey, nil)
	if err != nil {
		return err
	}
	request.Header.Add("Authorization", "Bearer "+os.Getenv("ADMIN_API_KEY"))

	client := &http.Client{}
	_, err = client.Do(request)
	if err != nil {
		return err
	}

	return nil
}

func main() {
	// Request a new API key
	apiKey, err := requestApiKey()
	if err != nil {
		fmt.Println("Error requesting API key:", err)
		return
	}
	fmt.Println("API Key:", apiKey)

	// Use the API key...

	// Delete the API key after use
	if err := deleteApiKey(apiKey); err != nil {
		fmt.Println("Error deleting API key:", err)
	}
}

// Ensure to set ADMIN_API_KEY in your environment variables.