# Deepgram Diarization Feature and Pricing

Enabling the diarization feature in Deepgram does not incur additional costs beyond the usual transcription pricing. This feature is included within the standard transcription services without any extra fees.

## Enabling Diarization in Deepgram

When you are making an API request to Deepgram for transcribing audio content, you can activate the diarization feature by including the `diarize` parameter and setting it to `true`. This allows the system to differentiate between speakers within the audio.

### Example Requests Across SDKs

Using this in different programming languages, you can include the parameter in the requests as follows:

#### Node.js/JavaScript
```javascript
const axios = require('axios');

axios.post('https://api.deepgram.com/v1/listen', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  params: {
    'diarize': true,
    'language': 'en'
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```

#### Python
```python
import requests

response = requests.post(
    'https://api.deepgram.com/v1/listen',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
    },
    params={
        'diarize': 'true',
        'language': 'en',
    }
)
print(response.json())
```

#### .NET
```csharp
using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_API_KEY");
var response = await client.PostAsync(
    "https://api.deepgram.com/v1/listen?diarize=true&language=en",
    null
);
string responseBody = await response.Content.ReadAsStringAsync();
Console.WriteLine(responseBody);
```

#### Go
```go
package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {
	client := &http.Client{}
	req, _ := http.NewRequest("POST", "https://api.deepgram.com/v1/listen?diarize=true&language=en", nil)
	req.Header.Add("Authorization", "Bearer YOUR_API_KEY")
	resp, _ := client.Do(req)
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(body))
}
```

#### Rust
```rust
use reqwest::blocking::Client;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new();
    let response = client.post("https://api.deepgram.com/v1/listen")
        .header("Authorization", "Bearer YOUR_API_KEY")
        .query(&[("diarize", "true"), ("language", "en")])
        .send()?;

    println!("{}", response.text()?);
    Ok(())
}
```

## Conclusion

Incorporating diarization into your transcription tasks using the Deepgram API does not require additional fees, making it an efficient option for projects that demand speaker differentiation. Whether you are dealing with customer support recordings or interviews, employing speaker diarization can provide clarity by isolating distinct voices within the audio.

### References
- [Deepgram Documentation](https://developers.deepgram.com)
- [Deepgram GitHub Discussions](https://github.com/orgs/deepgram/discussions)
- [Deepgram Discord Community](https://discord.gg/deepgram)