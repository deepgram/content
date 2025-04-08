#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// Colours for logging
const colours = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function logInfo(message) {
    console.log(`${colours.cyan}[INFO]${colours.reset} ${message}`);
}

function logSuccess(message) {
    console.log(`${colours.green}[SUCCESS]${colours.reset} ${message}`);
}

function logWarning(message) {
    console.log(`${colours.yellow}[WARNING]${colours.reset} ${message}`);
}

function logError(message) {
    console.error(`${colours.red}[ERROR]${colours.reset} ${message}`);
}

// Function to recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
    logInfo(`Scanning directory: ${dirPath}`);
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else {
            arrayOfFiles.push(filePath);
        }
    });

    return arrayOfFiles;
}

function getRandomUntranslatedFile() {
    logInfo('Finding untranslated files...');
    
    // Get all English articles
    const enFiles = getAllFiles('articles/en')
        .map(file => path.relative('articles/en', file));
    logInfo(`Found ${enFiles.length} English files`);

    // Get all Spanish articles
    const esFiles = getAllFiles('articles/es')
        .map(file => path.relative('articles/es', file));
    logInfo(`Found ${esFiles.length} Spanish files`);

    // Find English files that don't have Spanish counterparts
    const untranslatedFiles = enFiles.filter(enFile => !esFiles.includes(enFile));
    logInfo(`Found ${untranslatedFiles.length} untranslated files`);

    if (untranslatedFiles.length === 0) {
        logSuccess('All files are translated!');
        process.exit(0);
    }

    // Display list of untranslated files
    logInfo('\nUntranslated files:');
    untranslatedFiles.forEach((file, index) => {
        console.log(`${colours.dim}${index + 1}.${colours.reset} ${file}`);
    });
    console.log(''); // Empty line for readability

    // Pick a random untranslated file
    const selectedFile = untranslatedFiles[Math.floor(Math.random() * untranslatedFiles.length)];
    logInfo(`Selected file for translation: ${colours.bright}${selectedFile}${colours.reset}`);
    return selectedFile;
}

// Get the article path either from command line or randomly
const articlePath = process.argv.length >= 3 ? process.argv[2] : getRandomUntranslatedFile();
const enPath = path.join('articles/en', articlePath);
const esPath = path.join('articles/es', articlePath);

logInfo(`Processing file: ${articlePath}`);

// Check if the file exists
if (!fs.existsSync(enPath)) {
    logError(`File not found: ${enPath}`);
    process.exit(1);
}

// Check if the file is already translated
if (fs.existsSync(esPath)) {
    logError(`File already exists in Spanish: ${esPath}`);
    process.exit(1);
}

// Read the article content
logInfo('Reading file content...');
const content = fs.readFileSync(enPath, 'utf8');
logInfo(`File read successfully (${content.length} characters)`);

if (!process.env.OPENAI_API_KEY) {
    logError('Please set the OPENAI_API_KEY environment variable');
    process.exit(1);
}

async function translateContent() {
    logInfo('Sending translation request to OpenAI...');
    const postData = JSON.stringify({
        model: "gpt-4.5-preview",
        messages: [
            {
                role: "system",
                content: `You are a professional translator. Translate the following content from English to Spanish while maintaining:
1. All markdown formatting
2. All code blocks and their languages
3. All links and their URLs
4. All technical terms should be translated to their commonly accepted Spanish equivalents
5. Maintain the same tone and style as the original
6. Keep all frontmatter fields but translate their values
7. Preserve all special characters and formatting`
            },
            {
                role: "user",
                content: content
            }
        ],
        response_format: {
            type: "text"
        },
        temperature: 1,
        max_completion_tokens: 16384,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: false
    });

    const options = {
        hostname: 'api.openai.com',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            logInfo(`Response status code: ${res.statusCode}`);
            let body = '';

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                if (res.statusCode !== 200) {
                    logError(`API request failed with status ${res.statusCode}`);
                    logError('Response body:', body);
                    reject(new Error(`API request failed with status ${res.statusCode}`));
                    return;
                }

                try {
                    const response = JSON.parse(body);
                    resolve(response.choices[0].message.content);
                } catch (err) {
                    logError('Failed to parse response:', err);
                    logError('Response body:', body);
                    reject(err);
                }
            });
        });

        req.on('error', (e) => {
            logError(`Request failed: ${e.message}`);
            reject(e);
        });

        // Set a timeout for the request
        req.setTimeout(120000, () => {
            logError('Request timed out after 120 seconds');
            req.destroy();
            reject(new Error('Request timed out after 120 seconds'));
        });

        logInfo('Writing request data...');
        req.write(postData);
        logInfo('Ending request...');
        req.end();
    });
}

async function main() {
    try {
        const translatedContent = await translateContent();

        // Ensure the target directory exists
        const targetDir = path.dirname(esPath);
        if (!fs.existsSync(targetDir)) {
            logInfo(`Creating directory: ${targetDir}`);
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Write the translated content
        logInfo('Writing translated content...');
        fs.writeFileSync(esPath, translatedContent);
        logSuccess(`Successfully translated to: ${esPath}`);

    } catch (error) {
        logError(`Error during translation: ${error.message}`);
        process.exit(1);
    }
}

main(); 