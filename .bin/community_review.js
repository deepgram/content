#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load .env file into process.env
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            const envLines = envContent.split('\n');
            
            for (const line of envLines) {
                const trimmedLine = line.trim();
                // Skip empty lines and comments
                if (trimmedLine === '' || trimmedLine.startsWith('#')) {
                    continue;
                }
                
                // Split by the first equals sign
                const equalIndex = trimmedLine.indexOf('=');
                if (equalIndex > 0) {
                    const key = trimmedLine.substring(0, equalIndex).trim();
                    let value = trimmedLine.substring(equalIndex + 1).trim();
                    
                    // Remove quotes if present
                    if ((value.startsWith('"') && value.endsWith('"')) || 
                        (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.substring(1, value.length - 1);
                    }
                    
                    // Only set if not already defined in process.env
                    if (!process.env[key]) {
                        process.env[key] = value;
                    }
                }
            }
            console.log('Loaded environment variables from .env file');
        }
    } catch (error) {
        console.error('Error loading .env file:', error.message);
    }
}

// Load environment variables from .env
loadEnv();

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

function getRandomCommunityArticle() {
    logInfo('Finding community articles...');
    
    // Get all community articles
    const communityArticles = getAllFiles('articles/en/community')
        .map(file => path.relative('articles/en/community', file));
    logInfo(`Found ${communityArticles.length} community articles`);

    if (communityArticles.length === 0) {
        logError('No community articles found.');
        process.exit(1);
    }

    // Display list of community articles
    logInfo('\nCommunity articles:');
    communityArticles.forEach((file, index) => {
        console.log(`${colours.dim}${index + 1}.${colours.reset} ${file}`);
    });
    console.log(''); // Empty line for readability

    // Pick a random community article
    const selectedFile = communityArticles[Math.floor(Math.random() * communityArticles.length)];
    logInfo(`Selected article for review: ${colours.bright}${selectedFile}${colours.reset}`);
    return selectedFile;
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

// Get vector store ID from metadata file
function getVectorStoreId() {
    try {
        const metadataPath = path.resolve(process.cwd(), '.bin/vectorstore_metadata.json');
        if (!fs.existsSync(metadataPath)) {
            throw new Error('Vector store metadata file not found. Please run the embedding process first.');
        }
        
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        const vectorStoreId = metadata.vectorStoreId;
        
        if (!vectorStoreId) {
            throw new Error('Vector store ID not found in metadata file.');
        }
        
        return vectorStoreId;
    } catch (error) {
        logError(`Error getting vector store ID: ${error.message}`);
        process.exit(1);
    }
}

// Function to extract the main question from the community article
function extractArticleQuestion(content) {
    try {
        const sections = parseMarkdownSections(content);
        let question = "";
        
        // First, try to find a CommunityQuestion component
        const communityQuestionMatch = content.match(/<CommunityQuestion>(.*?)<\/CommunityQuestion>/s);
        if (communityQuestionMatch && communityQuestionMatch[1]) {
            question = communityQuestionMatch[1].trim();
            logInfo("Found question in CommunityQuestion component");
            return question;
        }
        
        // Try to find question in frontmatter
        const frontmatterSection = sections.find(section => section.heading === 'frontmatter');
        if (frontmatterSection) {
            const titleMatch = frontmatterSection.content.match(/title:\s*["']?([^"'\r\n]+)["']?/);
            if (titleMatch && titleMatch[1]) {
                question = titleMatch[1];
                logInfo("Found question in frontmatter title");
            }
        }
        
        // If no question in frontmatter, try to find first H2/H3 heading
        if (!question) {
            for (const section of sections) {
                if (section.heading && section.heading !== 'frontmatter') {
                    question = section.heading;
                    logInfo("Found question in heading");
                    break;
                }
            }
        }

        // If still no question, use the file name
        if (!question) {
            const filename = path.basename(communityPath, '.mdx');
            question = filename.replace(/-/g, ' ');
            logInfo("Using filename as question");
        }
        
        return question;
    } catch (error) {
        logError(`Error extracting article question: ${error.message}`);
        return "Deepgram API question";
    }
}

// Function to search the vector store
async function searchVectorStore(query, vectorStoreId) {
    logInfo(`Searching vector store for: "${query}"`);
    
    const postData = JSON.stringify({
        query: query
    });

    const options = {
        hostname: 'api.openai.com',
        path: `/v1/vector_stores/${vectorStoreId}/search`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    try {
        const responseData = await new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    if (res.statusCode !== 200) {
                        reject(new Error(`Vector search failed with status code ${res.statusCode}: ${data}`));
                        return;
                    }
                    
                    try {
                        const parsedData = JSON.parse(data);
                        resolve(parsedData);
                    } catch (err) {
                        reject(new Error(`Failed to parse vector search response: ${err.message}`));
                    }
                });
            });
            
            req.on('error', (err) => {
                reject(new Error(`Vector search request failed: ${err.message}`));
            });
            
            req.write(postData);
            req.end();
        });
        
        logSuccess(`Found ${responseData.data.length} relevant documents`);
        return responseData;
    } catch (error) {
        logError(`Vector search error: ${error.message}`);
        return { data: [] };
    }
}

// Format the retrieved vector store results for the chatbot
function formatVectorResults(searchResults) {
    if (!searchResults || !searchResults.data || searchResults.data.length === 0) {
        return "No relevant documentation found.";
    }
    
    let formattedResults = "Relevant Deepgram documentation:\n\n";
    
    searchResults.data.forEach((result, index) => {
        formattedResults += `Document ${index + 1}: ${result.filename}\n`;
        formattedResults += `Score: ${result.score}\n`;
        
        if (result.content && result.content.length > 0) {
            result.content.forEach(content => {
                if (content.type === 'text') {
                    formattedResults += `\nContent:\n${content.text}\n`;
                }
            });
        }
        
        formattedResults += "\n---\n\n";
    });
    
    return formattedResults;
}

// Function to review article using ChatGPT
async function reviewArticle(content, vectorSearchResults) {
    logInfo('Parsing markdown sections...');
    const sections = parseMarkdownSections(content);
    logInfo(`Found ${sections.length} sections to review`);

    // Review guidelines based on content-reviews rule
    const reviewGuidelines = `
## ONLY Instructions
- ONLY apply these rules to markdown files inside articles/en/commumity
- ONLY include code examples that have been tested with the current API version
- ONLY reference official Deepgram documentation or verified community resources
- ONLY use relative links for internal documentation references
- ONLY include API keys in example code as placeholders (e.g., YOUR_API_KEY)

## ALWAYS Instructions
- ALWAYS add frontmatter when missing, based on the content - including a title, summary and description
- ALWAYS compare articles for accuracy against known Deepgram API Specs (openapi.yml and asyncapi.yml)
- ALWAYS check articles for accuracy against similar content on https://developers.deepgram.com
- ALWAYS include a clear problem statement at the beginning of troubleshooting articles
- ALWAYS provide complete error messages when discussing error resolution
- ALWAYS use proper syntax highlighting for code blocks (e.g., \`\`\`python, \`\`\`javascript, \`\`\`shell)
- ALWAYS include a "References" section with relevant documentation links
- ALWAYS add appropriate metadata (tags, categories, last updated date)
- ALWAYS test all code examples before publication
- ALWAYS include error handling in code examples
- ALWAYS use British English spelling and terminology
- ALWAYS provide alternative solutions where applicable
- ALWAYS include community support links (Discord, GitHub Discussions)
- ALWAYS prefer latest models (Nova 3 > Nova 2 > Nova)
- ALWAYS prefer latest features (keyterm prompting > keywords - but it requires Nova 3)

## NEVER Instructions
- NEVER use H1 (#) for the main article title. Use the frontmatter.
- NEVER include actual API keys or sensitive credentials
- NEVER use deprecated API endpoints or methods
- NEVER publish untested code examples
- NEVER use absolute URLs for internal documentation
- NEVER publish content without proper error handling examples
- NEVER use American English spelling
- NEVER omit necessary import statements in code examples
- NEVER publish content without proper heading hierarchy
- NEVER include broken or outdated links
- NEVER publish content without proper code formatting
`;

    // First, get a review and recommendations
    const reviewMessages = [
        {
            role: "system",
            content: `You are a technical documentation reviewer specialising in the Deepgram API.
            You will review community articles and provide a brief assessment with recommendations for improvement.
            
            Use the following review criteria to assess the article:
            ${reviewGuidelines}
            
            For your review output, provide the following sections:
            1. Brief Summary (2-3 sentences about the article and its quality)
            2. Main Issues (list 2-4 key problems with the article)
            3. Improvement Plan (bullet points of how you would improve it)
            
            Be concise but specific. Focus on factual improvements rather than stylistic changes.`
        }
    ];

    // Add the vector search results as context for the review
    if (vectorSearchResults && vectorSearchResults.length > 0) {
        reviewMessages.push({
            role: "user", 
            content: `Here is relevant documentation from the Deepgram knowledge base that might help review this article:\n\n${vectorSearchResults}`
        });
    }

    // Add the article content to review 
    reviewMessages.push({
        role: "user",
        content: `Here is the community article to review:\n\n${content}`
    });

    // Make the review request
    const reviewPostData = JSON.stringify({
        model: "gpt-4o",
        messages: reviewMessages,
        response_format: {
            type: "text"
        },
        temperature: 0.7,
        max_tokens: 2048,
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
            'Content-Length': Buffer.byteLength(reviewPostData)
        }
    };

    // Get the review summary
    const reviewSummary = await new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            logInfo(`Review response status code: ${res.statusCode}`);
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

        req.setTimeout(60000, () => {
            logError('Request timed out after 60 seconds');
            req.destroy();
            reject(new Error('Request timed out after 60 seconds'));
        });

        req.write(reviewPostData);
        req.end();
    });

    // Display the review summary
    console.log('\n' + colours.bright + 'ARTICLE REVIEW:' + colours.reset);
    console.log(reviewSummary);
    console.log('\n');

    // Get user input if not in CI mode
    let userInput = '';
    if (!ciMode) {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        userInput = await new Promise(resolve => {
            readline.question(`${colours.yellow}Enter additional instructions for improving this article (or press Enter to continue with standard improvements):${colours.reset} `, answer => {
                readline.close();
                resolve(answer);
            });
        });
        
        logInfo('Improving article based on review and user input...');
    } else {
        logInfo('Skipping user input prompt (CI mode) and proceeding with standard improvements...');
    }

    // Now proceed with the improvement based on user input
    const improveMessages = [
        {
            role: "system",
            content: `You are a technical documentation expert specialising in the Deepgram API.
            You will improve community articles for adherence to our documentation standards.
            The article should be structured as a Q&A, preserving the original question but improving the answer.
            
            Use the following criteria to guide your improvements:
            ${reviewGuidelines}
            
            IMPORTANT REQUIREMENTS:
            1. Maintain the original question and slug
            2. Preserve the <CommunityQuestion> component and its content when present
            3. Prioritize extremely small, focused code examples (especially cURL examples) 
            4. Always follow code examples with links to the relevant documentation
            5. Structure the content in a clear Q&A format
            6. Keep explanations concise and focused on practical solutions
            7. Ensure the content follows all the guidelines above
            
            Return the improved article content in Markdown format, preserving the frontmatter.`
        }
    ];

    // Add the vector search results as context
    if (vectorSearchResults && vectorSearchResults.length > 0) {
        improveMessages.push({
            role: "user", 
            content: `Here is relevant documentation from the Deepgram knowledge base that might help you improve this article:\n\n${vectorSearchResults}`
        });
    }

    // Add the article content as a user message
    improveMessages.push({
        role: "user",
        content: `Here is the community article to improve:\n\n${content}`
    });

    // Add the review summary as context
    improveMessages.push({
        role: "user",
        content: `I've reviewed this article and identified these issues:\n\n${reviewSummary}`
    });

    // Add user input if provided
    if (userInput.trim()) {
        improveMessages.push({
            role: "user",
            content: `Additional instructions for improvement: ${userInput}`
        });
    }

    const improvePostData = JSON.stringify({
        model: "gpt-4o",
        messages: improveMessages,
        response_format: {
            type: "text"
        },
        temperature: 0.7,
        max_tokens: 16384,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: false
    });

    // Set new options with content length
    const improveOptions = {
        hostname: 'api.openai.com',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Length': Buffer.byteLength(improvePostData)
        }
    };

    const improvedContent = await new Promise((resolve, reject) => {
        const req = https.request(improveOptions, (res) => {
            logInfo(`Improvement response status code: ${res.statusCode}`);
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

        req.write(improvePostData);
        req.end();
    });

    return improvedContent;
}

// Parse command line arguments
const args = process.argv.slice(2);
const ciMode = args.includes('--ci');
const articlePathIndex = args.findIndex(arg => !arg.startsWith('--'));
const articlePathArg = articlePathIndex !== -1 ? args[articlePathIndex] : null;

// Get the article path either from command line or randomly
const articlePath = articlePathArg || getRandomCommunityArticle();
const communityPath = path.join('articles/en/community', articlePath);

logInfo(`Processing article: ${articlePath}`);
if (ciMode) {
    logInfo('Running in CI mode - will skip prompting for additional instructions');
}

// Check if the file exists
if (!fs.existsSync(communityPath)) {
    logError(`File not found: ${communityPath}`);
    process.exit(1);
}

// Main function 
async function main() {
    logInfo('Starting community article review with vector search enhancement...');
    
    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
        logError('Please set the OPENAI_API_KEY environment variable');
        process.exit(1);
    }
    
    // Get vector store ID
    const vectorStoreId = getVectorStoreId();
    logInfo(`Using vector store ID: ${vectorStoreId}`);
    
    try {
        // Read the article content
        logInfo('Reading article content...');
        const content = fs.readFileSync(communityPath, 'utf8');
        logInfo(`Article read successfully (${content.length} characters)`);
        
        // Extract the main question from the article
        const question = extractArticleQuestion(content);
        logInfo(`Extracted question: "${question}"`);
        
        // Search the vector store for relevant documentation
        const searchResults = await searchVectorStore(question, vectorStoreId);
        const formattedResults = formatVectorResults(searchResults);
        
        // Review the article with vector search context
        logInfo('Reviewing article with AI and vector search context...');
        let reviewedContent = await reviewArticle(content, formattedResults);
        
        // Remove any Markdown code fence wrappers that might have been added
        reviewedContent = removeMarkdownCodeFences(reviewedContent);
        
        logSuccess('Review and improvement completed successfully');
        
        // Update the original file with improved content
        fs.writeFileSync(communityPath, reviewedContent);
        logSuccess(`File updated with improvements: ${communityPath}`);
        
        // Print a summary
        console.log('\n' + colours.bright + 'ARTICLE UPDATED SUCCESSFULLY' + colours.reset);
        console.log(`Updated file: ${communityPath}`);
    } catch (error) {
        logError(`Error during review: ${error.message}`);
        process.exit(1);
    }
}

// Function to remove Markdown code fence wrappers if present
function removeMarkdownCodeFences(content) {
    // Check for content wrapped in ```markdown ... ``` or ``` ... ```
    const markdownFencePattern = /^```(?:markdown)?\s*\n([\s\S]*)\n```\s*$/;
    const match = content.match(markdownFencePattern);
    
    if (match && match[1]) {
        logInfo('Removing Markdown code fence wrappers from the content');
        return match[1];
    }
    
    return content;
}

main();