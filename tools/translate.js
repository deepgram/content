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
    logWarning(`File already exists in Spanish: ${esPath}. Overwriting...`);
}

// Read the article content
logInfo('Reading file content...');
const content = fs.readFileSync(enPath, 'utf8');
logInfo(`File read successfully (${content.length} characters)`);

if (!process.env.OPENAI_API_KEY) {
    logError('Please set the OPENAI_API_KEY environment variable');
    process.exit(1);
}

// Function to parse markdown content into sections
function parseMarkdownSections(content) {
    const sections = [];
    let currentSection = '';
    let currentHeading = '';
    let inFrontmatter = false;
    let frontmatter = '';

    // Split content into lines
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Handle frontmatter
        if (line.trim() === '---') {
            inFrontmatter = !inFrontmatter;
            if (inFrontmatter) {
                frontmatter += line + '\n';
            } else {
                frontmatter += line;
                sections.push({
                    heading: 'frontmatter',
                    content: frontmatter
                });
            }
            continue;
        }

        if (inFrontmatter) {
            frontmatter += line + '\n';
            continue;
        }

        // Check for headings (H1, H2, H3)
        const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
        if (headingMatch) {
            // If we have a previous section, save it
            if (currentSection) {
                sections.push({
                    heading: currentHeading,
                    content: currentSection.trim()
                });
            }

            // Start new section
            currentHeading = headingMatch[2];
            currentSection = line + '\n';
        } else {
            currentSection += line + '\n';
        }
    }

    // Add the last section
    if (currentSection) {
        sections.push({
            heading: currentHeading,
            content: currentSection.trim()
        });
    }

    return sections;
}

async function translateContent() {
    logInfo('Parsing markdown sections...');
    const sections = parseMarkdownSections(content);
    logInfo(`Found ${sections.length} sections to translate`);

    let translatedContent = '';
    let messages = [
        {
            role: "system",
            content: `You are a technical writer fluent in English and Spanish. You will be given an article section by section, and asked to translate it to Spanish.
            1. ALWAYS translate the content from English to Spanish.
            2. ALWAYS consider the entire content, and instead of a like-for-like translation, translate it to read naturally.
            3. ALWAYS translate Markdown titles and content.
            4. NEVER translate the frontmatter or slug.
            5. NEVER translate code blocks and their languages.
            6. NEVER translate links and their URLs.
            7. ALWAYS translate technical terms to their commonly accepted Spanish equivalents.
            8. ALWAYS maintain the same tone and style as the original.
            10. ALWAYS preserve all special characters and formatting.
            11. ALWAYS preserve custom components.`
        }
    ];

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        logInfo(`Translating section: ${section.heading || 'frontmatter'}`);

        // Add the current section to messages
        messages.push({
            role: "user",
            content: section.content
        });

        const postData = JSON.stringify({
            model: "gpt-4.5-preview",
            messages: messages,
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

        const translatedSection = await new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                logInfo(`Response status code: ${res.statusCode}`);
                let body = '';

                res.on('data', (chunk) => {
                    body += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode !== 200) {
                        logError(`API request failed with status ${res.statusCode}`);
                        logError(`Response body: ${body}`);
                        reject(new Error(`API request failed with status ${res.statusCode}`));
                        return;
                    }

                    try {
                        const response = JSON.parse(body);
                        resolve(response.choices[0].message.content);
                    } catch (err) {
                        logError(`Failed to parse response: ${err}`);
                        logError(`Response body: ${body}`);
                        reject(err);
                    }
                });
            });

            req.on('error', (e) => {
                logError(`Request failed: ${e.message}`);
                reject(e);
            });

            req.setTimeout(120000, () => {
                logError('Request timed out after 120 seconds');
                req.destroy();
                reject(new Error('Request timed out after 120 seconds'));
            });

            req.write(postData);
            req.end();
        });

        // Add the translated section to the final content
        translatedContent += translatedSection + '\n\n';

        // Replace the user message with the assistant's response
        messages = messages.slice(0, -1); // Remove the last user message
        messages.push({
            role: "assistant",
            content: translatedSection
        });
    }

    return translatedContent;
}

function insertLanguageLink(content, language, targetLanguage, targetPath) {
    const frontmatterEnd = content.indexOf('---', 3); // Find the end of frontmatter
    const linkText = language === 'en' 
        ? `> 📣 This article is also available in [**Spanish**](/es/${targetPath}).`
        : `> 📣 Este artículo también está disponible en [**inglés**](/en/${targetPath}).`;

    if (frontmatterEnd === -1) {
        logWarning('No frontmatter found, placing language link at the top of the file');
        return linkText + '\n\n' + content;
    }

    return content.slice(0, frontmatterEnd + 3) + '\n\n' + linkText + '\n\n' + content.slice(frontmatterEnd + 3);
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

        // Add language links to both files
        const relativePath = path.relative('articles', esPath).replace(/^es\//, '');
        const contentWithLinks = insertLanguageLink(translatedContent, 'es', 'en', relativePath);
        const originalContent = fs.readFileSync(enPath, 'utf8');
        const originalWithLinks = insertLanguageLink(originalContent, 'en', 'es', relativePath);

        // Write the translated content
        logInfo('Writing translated content...');
        fs.writeFileSync(esPath, contentWithLinks);
        fs.writeFileSync(enPath, originalWithLinks);
        logSuccess(`Successfully translated to: ${esPath}`);

    } catch (error) {
        logError(`Error during translation: ${error.message}`);
        process.exit(1);
    }
}

main(); 