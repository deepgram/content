#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const readline = require('readline');
const { exec } = require('child_process');

// Configuration for delays and rate limiting
const RATE_LIMIT_CONFIG = {
    // Delay between file uploads (milliseconds)
    FILE_UPLOAD_DELAY: 3000,
    // Delay between batches of files (milliseconds)
    BATCH_DELAY: 7000,
    // Delay between file part uploads (milliseconds)
    PART_UPLOAD_DELAY: 500,
    // Maximum number of retries for API requests
    MAX_RETRIES: 10,
    // Delay before retry attempts (increases exponentially)
    RETRY_DELAY: 1500
};

// Path to the metadata file that tracks uploads
const METADATA_FILE_PATH = path.join(__dirname, 'vectorstore_metadata.json');

// Load .env file into process.env
function loadEnv() {
    try {
        // Try to find the .env file
        const envPath = path.resolve(process.cwd(), '.env');
        console.log(`Looking for .env file at: ${envPath}`);
        
        if (!fs.existsSync(envPath)) {
            console.log('.env file not found');
            return false;
        }
        
        console.log('.env file found, loading variables...');
        
        // Read the file content
        const envFileContent = fs.readFileSync(envPath, 'utf8');
        
        // Parse each line
        const envVars = envFileContent
            .split('\n')
            .filter(line => line.trim() !== '' && !line.trim().startsWith('#'))
            .reduce((acc, line) => {
                // Find the first equals sign
                const equalsPos = line.indexOf('=');
                if (equalsPos > 0) {
                    const key = line.slice(0, equalsPos).trim();
                    let value = line.slice(equalsPos + 1).trim();
                    
                    // Remove surrounding quotes if present
                    if ((value.startsWith('"') && value.endsWith('"')) || 
                        (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.slice(1, -1);
                    }
                    
                    // Set in accumulator
                    acc[key] = value;
                }
                return acc;
            }, {});
        
        // Load variables into process.env
        Object.keys(envVars).forEach(key => {
            process.env[key] = envVars[key];
            // Only show the first few characters of the value for security
            const displayValue = envVars[key].length > 5 
                ? `${envVars[key].substring(0, 3)}${'*'.repeat(5)}` 
                : envVars[key];
            console.log(`Loaded: ${key}=${displayValue}`);
        });
        
        return Object.keys(envVars).length > 0;
    } catch (error) {
        console.error('Error loading .env file:', error);
        return false;
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
            if (path.extname(filePath).toLowerCase() === '.mdx' || path.extname(filePath).toLowerCase() === '.md') {
                arrayOfFiles.push(filePath);
            }
        }
    });

    return arrayOfFiles;
}

// Function to make HTTPS requests to the OpenAI API
async function makeOpenAIRequest(endpoint, method, data, additionalOptions = {}) {
    // Get API key directly from process.env
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error('OPENAI_API_KEY environment variable is not set');
    }

    // Handle query parameters
    let path = `/v1/${endpoint}`;
    if (additionalOptions.queryParams && Object.keys(additionalOptions.queryParams).length > 0) {
        const queryString = Object.entries(additionalOptions.queryParams)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        path = `${path}?${queryString}`;
    }

    const postData = data ? JSON.stringify(data) : '';
    
    const options = {
        hostname: 'api.openai.com',
        path: path,
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    };

    // Merge any additional headers
    if (additionalOptions.headers) {
        options.headers = { ...options.headers, ...additionalOptions.headers };
    }

    if (postData) {
        options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let body = '';

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    reject(new Error(`API request failed with status ${res.statusCode}: ${body}`));
                    return;
                }

                try {
                    const response = body ? JSON.parse(body) : {};
                    resolve(response);
                } catch (err) {
                    reject(new Error(`Failed to parse response: ${err}`));
                }
            });
        });

        req.on('error', (e) => {
            reject(new Error(`Request failed: ${e.message}`));
        });

        req.setTimeout(60000, () => {
            req.destroy();
            reject(new Error('Request timed out after 60 seconds'));
        });

        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}

// Function to verify vector store exists
async function verifyVectorStore(vectorStoreId) {
    try {
        logInfo(`Verifying vector store: ${vectorStoreId}`);
        
        // First try to get a list of all vector stores
        const response = await makeOpenAIRequest('vector_stores', 'GET');
        
        // Check if our vector store is in the list
        const vectorStore = response.data?.find(store => store.id === vectorStoreId);
        
        if (!vectorStore) {
            // If not found in the list, try to fetch it directly
            try {
                const directResponse = await makeOpenAIRequest(`vector_stores/${vectorStoreId}`, 'GET');
                if (directResponse.id === vectorStoreId) {
                    logSuccess(`Vector store ${vectorStoreId} exists`);
                    return true;
                }
            } catch (error) {
                logError(`Vector store ${vectorStoreId} does not exist: ${error.message}`);
                return false;
            }
        } else {
            logSuccess(`Vector store ${vectorStoreId} exists`);
            return true;
        }
    } catch (error) {
        logError(`Failed to verify vector store: ${error.message}`);
        return false;
    }
}

// Function to get vector store files
async function getVectorStoreFiles(vectorStoreId) {
    try {
        logInfo(`Fetching files from vector store: ${vectorStoreId}`);
        
        let allFiles = [];
        let lastId = null;
        let hasMore = true;
        
        while (hasMore) {
            // Build query parameters
            const queryParams = { limit: 100 };
            if (lastId) {
                queryParams.after = lastId;
            }
            
            logInfo(`Fetching batch of files${lastId ? ` after ${lastId}` : ''}`);
            
            const response = await makeOpenAIRequest(`vector_stores/${vectorStoreId}/files`, 'GET', null, {
                queryParams: queryParams
            });
            
            if (!response.data) {
                logWarning('Unexpected response format, no data field found');
                break;
            }
            
            // Add this batch to our results
            allFiles = allFiles.concat(response.data);
            logInfo(`Retrieved ${response.data.length} files in this batch`);
            
            // Update pagination state
            hasMore = response.has_more === true;
            
            if (hasMore && response.last_id) {
                lastId = response.last_id;
                logInfo(`More files exist, continuing after ID: ${lastId}`);
            } else {
                hasMore = false;
            }
        }
        
        if (allFiles.length > 0) {
            // Log the first few files for debugging
            logInfo(`Found ${allFiles.length} total files in vector store`);
            logInfo(`Sample file entries in vector store:`);
            for (let i = 0; i < Math.min(3, allFiles.length); i++) {
                const file = allFiles[i];
                logInfo(`  File ${i+1}: id=${file.id}, filename=${file.filename || 'undefined'}`);
            }
        } else {
            logInfo(`No files found in vector store or unexpected response format`);
        }
        
        return allFiles;
    } catch (error) {
        logError(`Failed to fetch vector store files: ${error.message}`);
        throw error;
    }
}

// Function to delete a file from the vector store
async function deleteFileFromVectorStore(vectorStoreId, fileId) {
    try {
        logInfo(`Deleting file: ${fileId} from vector store: ${vectorStoreId}`);
        await makeOpenAIRequest(`vector_stores/${vectorStoreId}/files/${fileId}`, 'DELETE');
        logSuccess(`Successfully deleted file: ${fileId}`);
    } catch (error) {
        logError(`Failed to delete file ${fileId}: ${error.message}`);
        throw error;
    }
}

// Function to ask for confirmation
async function confirmAction(message) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(`${message} (y/n): `, (answer) => {
            rl.close();
            resolve(answer.toLowerCase() === 'y');
        });
    });
}

// Add a utility function for retrying operations with exponential backoff
async function withRetry(operation, operationName, maxRetries = RATE_LIMIT_CONFIG.MAX_RETRIES) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            if (attempt > 1) {
                const delayMs = RATE_LIMIT_CONFIG.RETRY_DELAY * Math.pow(2, attempt - 2);
                logInfo(`Retry attempt ${attempt}/${maxRetries} for ${operationName} after ${delayMs}ms delay...`);
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }
            
            return await operation();
        } catch (error) {
            lastError = error;
            
            // Only log and retry if we have attempts remaining
            if (attempt < maxRetries) {
                logWarning(`Attempt ${attempt}/${maxRetries} for ${operationName} failed: ${error.message}`);
            }
        }
    }
    
    // If we've exhausted all retries, throw the last error
    throw new Error(`All ${maxRetries} attempts for ${operationName} failed. Last error: ${lastError.message}`);
}

// Update the createUpload function to use retry logic
async function createUpload(filePath) {
    const filename = path.basename(filePath);
    logInfo(`Creating upload for file: ${filename}`);
    
    return withRetry(async () => {
        // If the file is .mdx, change it to .md when uploading
        let uploadFilename = filename;
        if (uploadFilename.endsWith('.mdx')) {
            uploadFilename = uploadFilename.replace('.mdx', '.md');
            logInfo(`Converting .mdx file to .md: ${uploadFilename}`);
        }
        
        const fileStats = fs.statSync(filePath);
        const fileSize = fileStats.size;
        
        // Use text/markdown for both .md and .mdx files
        const mimeType = 'text/markdown';
        
        const response = await makeOpenAIRequest('uploads', 'POST', {
            purpose: 'assistants',
            filename: uploadFilename,
            bytes: fileSize,
            mime_type: mimeType
        });
        
        logSuccess(`Upload created with ID: ${response.id}`);
        return {
            uploadId: response.id,
            fileSize: fileSize,
            filePath: filePath,
            filename: uploadFilename
        };
    }, `create upload for ${filename}`);
}

// Update the uploadFilePart function to use retry logic
async function uploadFilePart(uploadId, filePath, partNumber, startByte, endByte) {
    const filename = path.basename(filePath);
    logInfo(`Uploading part ${partNumber} for file: ${filename}`);
    
    return withRetry(async () => {
        // Read the chunk of the file
        const fileHandle = fs.openSync(filePath, 'r');
        const bufferSize = endByte - startByte;
        const buffer = Buffer.alloc(bufferSize);
        fs.readSync(fileHandle, buffer, 0, bufferSize, startByte);
        fs.closeSync(fileHandle);
        
        // Get API key directly from process.env
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error('OPENAI_API_KEY environment variable is not set');
        }
        
        // Create a boundary for multipart/form-data
        const boundary = `----WebKitFormBoundary${Math.random().toString(16).substr(2)}`;
        
        // Create the multipart/form-data payload
        let payload = '';
        
        // Add data field - this is the only field needed
        payload += `--${boundary}\r\n`;
        payload += 'Content-Disposition: form-data; name="data"; filename="blob"\r\n';
        payload += 'Content-Type: application/octet-stream\r\n\r\n';
        
        // Create a Buffer to hold the entire payload
        const headerBuffer = Buffer.from(payload);
        const footerBuffer = Buffer.from(`\r\n--${boundary}--\r\n`);
        
        const options = {
            hostname: 'api.openai.com',
            path: `/v1/uploads/${uploadId}/parts`,
            method: 'POST',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
                'Authorization': `Bearer ${apiKey}`,
                'Content-Length': headerBuffer.length + buffer.length + footerBuffer.length
            }
        };
        
        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let responseBody = '';
                
                res.on('data', (chunk) => {
                    responseBody += chunk;
                });
                
                res.on('end', () => {
                    if (res.statusCode < 200 || res.statusCode >= 300) {
                        reject(new Error(`API request failed with status ${res.statusCode}: ${responseBody}`));
                        return;
                    }
                    
                    try {
                        const response = JSON.parse(responseBody);
                        logSuccess(`Successfully uploaded part ${partNumber} (ID: ${response.id})`);
                        resolve(response);
                    } catch (err) {
                        reject(new Error(`Failed to parse response: ${err}`));
                    }
                });
            });
            
            req.on('error', (e) => {
                reject(new Error(`Request failed: ${e.message}`));
            });
            
            // Write the components of the request - only data field, no part_number
            req.write(headerBuffer);
            req.write(buffer);
            req.write(footerBuffer);
            req.end();
        });
    }, `upload part ${partNumber} for ${filename}`);
}

// Function to cancel an upload
async function cancelUpload(uploadId) {
    try {
        logWarning(`Cancelling upload: ${uploadId}`);
        
        const response = await makeOpenAIRequest(`uploads/${uploadId}/cancel`, 'POST');
        
        logInfo(`Upload ${uploadId} cancelled successfully (status: ${response.status})`);
        return response;
    } catch (error) {
        logError(`Failed to cancel upload ${uploadId}: ${error.message}`);
        // Don't throw error here, we're already in an error handling path
    }
}

// Function to upload a file in chunks
async function uploadFileInChunks(uploadInfo) {
    try {
        const { uploadId, fileSize, filePath } = uploadInfo;
        const chunkSize = 64 * 1024 * 1024; // 64 MB chunks
        const totalChunks = Math.ceil(fileSize / chunkSize);
        
        logInfo(`Uploading file in ${totalChunks} chunks: ${path.basename(filePath)}`);
        
        const partIds = [];
        
        for (let i = 0; i < totalChunks; i++) {
            try {
                const startByte = i * chunkSize;
                const endByte = Math.min(startByte + chunkSize, fileSize);
                
                const partResponse = await uploadFilePart(uploadId, filePath, i + 1, startByte, endByte);
                partIds.push(partResponse.id);
                
                // Add delay between part uploads if there are more parts to upload
                if (i < totalChunks - 1 && RATE_LIMIT_CONFIG.PART_UPLOAD_DELAY > 0) {
                    logInfo(`Waiting ${RATE_LIMIT_CONFIG.PART_UPLOAD_DELAY}ms before uploading next part...`);
                    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_CONFIG.PART_UPLOAD_DELAY));
                }
            } catch (error) {
                logError(`Failed to upload part ${i + 1} for file ${path.basename(filePath)}: ${error.message}`);
                // If any part upload fails, cancel the entire upload
                await cancelUpload(uploadId);
                throw new Error(`Upload cancelled due to part ${i + 1} failure`);
            }
        }
        
        return { uploadId, partIds };
    } catch (error) {
        logError(`Failed to upload file in chunks: ${error.message}`);
        throw error;
    }
}

// Update the completeUpload function to use retry logic
async function completeUpload(uploadData) {
    const { uploadId, partIds } = uploadData;
    logInfo(`Completing upload: ${uploadId} with ${partIds.length} parts`);
    
    return withRetry(async () => {
        const response = await makeOpenAIRequest(`uploads/${uploadId}/complete`, 'POST', {
            part_ids: partIds
        });
        
        logSuccess(`Upload ${uploadId} completed successfully - File ID: ${response.file?.id || 'Unknown'}`);
        return response.file?.id || uploadId;
    }, `complete upload ${uploadId}`);
}

// Update the recordFileUpload function to track versions
function recordFileUpload(metadata, filePath, fileId, vectorStoreId) {
    const relativePath = path.relative(process.cwd(), filePath);
    const normalizedName = normalizeFilename(path.basename(filePath));
    
    // Get existing metadata or create new entry
    const existingData = metadata.files[relativePath] || {};
    
    // Increment version if this is an update, or start at 1 if new
    const currentVersion = existingData.version || 0;
    const newVersion = currentVersion + 1;
    
    // Keep first_seen date if exists, otherwise use current date
    const firstSeen = existingData.first_seen || new Date().toISOString();
    
    metadata.files[relativePath] = {
        fileId: fileId,
        filename: normalizedName,
        vectorStoreId: vectorStoreId,
        localPath: relativePath,
        lastUploaded: new Date().toISOString(),
        fileSizeBytes: fs.statSync(filePath).size,
        md5Hash: calculateMd5(filePath),
        version: newVersion,
        first_seen: firstSeen
    };
    
    return metadata;
}

// Update addFileToVectorStore to include attributes
async function addFileToVectorStore(vectorStoreId, fileId, filePath, metadata) {
    const relativePath = path.relative(process.cwd(), filePath);
    const metadataEntry = metadata.files[relativePath] || {};
    
    // Prepare file attributes
    const attributes = {
        full_path: relativePath,
        first_seen: metadataEntry.first_seen || new Date().toISOString(),
        version: metadataEntry.version || 1,
        modified_date: new Date().toISOString()
    };
    
    logInfo(`Adding file ${fileId} to vector store: ${vectorStoreId} (Path: ${relativePath}, Version: ${attributes.version})`);
    
    return withRetry(async () => {
        const response = await makeOpenAIRequest(`vector_stores/${vectorStoreId}/files`, 'POST', 
            {
                file_id: fileId,
                attributes: attributes
            }, 
            {
                headers: {
                    'OpenAI-Beta': 'assistants=v2'
                }
            }
        );
        
        logSuccess(`Successfully added file to vector store: ${fileId}`);
        logInfo(`File status: ${response.status}`);
        logInfo(`File attributes: path=${attributes.full_path}, version=${attributes.version}, first_seen=${attributes.first_seen}`);
        
        return response;
    }, `add file ${fileId} to vector store ${vectorStoreId}`);
}

// Function to load metadata from file
function loadMetadata() {
    try {
        if (fs.existsSync(METADATA_FILE_PATH)) {
            const data = fs.readFileSync(METADATA_FILE_PATH, 'utf8');
            const metadata = JSON.parse(data);
            logInfo(`Loaded metadata for ${Object.keys(metadata.files || {}).length} files from ${METADATA_FILE_PATH}`);
            
            // Ensure the structure is complete
            metadata.files = metadata.files || {};
            metadata.failures = metadata.failures || {};
            metadata.lastUpdated = metadata.lastUpdated || new Date().toISOString();
            metadata.vectorStoreId = metadata.vectorStoreId || null;
            
            return metadata;
        } else {
            logInfo(`No metadata file found at ${METADATA_FILE_PATH}, creating new metadata.`);
            return { 
                files: {},
                failures: {},
                lastUpdated: new Date().toISOString(),
                vectorStoreId: null
            };
        }
    } catch (error) {
        logError(`Failed to load metadata: ${error.message}`);
        return { 
            files: {},
            failures: {},
            lastUpdated: new Date().toISOString(),
            vectorStoreId: null
        };
    }
}

// Function to save metadata to file
function saveMetadata(metadata) {
    try {
        metadata.lastUpdated = new Date().toISOString();
        
        fs.writeFileSync(METADATA_FILE_PATH, JSON.stringify(metadata, null, 2), 'utf8');
        logInfo(`Saved metadata for ${Object.keys(metadata.files).length} files to ${METADATA_FILE_PATH}`);
        return true;
    } catch (error) {
        logError(`Failed to save metadata: ${error.message}`);
        return false;
    }
}

// Function to calculate MD5 hash of file contents
function calculateMd5(filePath) {
    try {
        const crypto = require('crypto');
        const fileContent = fs.readFileSync(filePath);
        return crypto.createHash('md5').update(fileContent).digest('hex');
    } catch (error) {
        logError(`Failed to calculate MD5 hash for ${filePath}: ${error.message}`);
        return '';
    }
}

// Update fileNeedsUpdate to prioritize content changes (MD5) over age
function fileNeedsUpdate(metadata, filePath, fileInfo = null) {
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Check if metadata exists for this file
    const metadataEntry = metadata.files[relativePath];
    if (!metadataEntry || !metadataEntry.lastUploaded || !metadataEntry.md5Hash) {
        logInfo(`No previous metadata found for: ${relativePath}`);
        return true; // No metadata, assume needs update
    }
    
    // Calculate current MD5 hash
    const currentMd5 = calculateMd5(filePath);
    
    // If content has changed, update regardless of time
    if (currentMd5 !== metadataEntry.md5Hash) {
        logInfo(`Content changed (different MD5 hash): ${relativePath}`);
        return true;
    }
    
    // If content is identical, check age only if needed
    const lastUploaded = new Date(metadataEntry.lastUploaded);
    const now = new Date();
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
    
    const ageInMs = now - lastUploaded;
    const ageInDays = ageInMs / ONE_DAY_IN_MS;
    
    // Only log age information
    if (ageInDays > 1) {
        logInfo(`File is older than 1 day (${Math.round(ageInDays)} days) but content unchanged: ${relativePath}`);
    } else {
        logInfo(`File is recent (${Math.round(ageInMs / (60 * 60 * 1000))} hours old) and content unchanged: ${relativePath}`);
    }
    
    // Content is the same, so we DON'T need to update regardless of age
    return false;
}

// Function to record a file failure in metadata
function recordFileFailure(metadata, filePath, error) {
    const relativePath = path.relative(process.cwd(), filePath);
    
    metadata.failures[relativePath] = {
        path: relativePath,
        error: error.message || String(error),
        timestamp: new Date().toISOString(),
        attemptCount: (metadata.failures[relativePath]?.attemptCount || 0) + 1
    };
    
    return metadata;
}

// Function to clear a file failure from metadata
function clearFileFailure(metadata, filePath) {
    const relativePath = path.relative(process.cwd(), filePath);
    if (metadata.failures[relativePath]) {
        delete metadata.failures[relativePath];
        logInfo(`Cleared failure record for ${relativePath}`);
    }
    return metadata;
}

// Add a utility function to normalize filenames for comparison
function normalizeFilename(filename) {
    // Remove any path components
    let normalized = path.basename(filename);
    
    // Convert .mdx to .md
    if (normalized.endsWith('.mdx')) {
        normalized = normalized.replace('.mdx', '.md');
    }
    
    return normalized.toLowerCase(); // Case-insensitive comparison
}

// Add a function to get the file info from the vector store
async function getFileInfo(fileId) {
    try {
        logInfo(`Fetching file info for: ${fileId}`);
        return await withRetry(async () => {
            const response = await makeOpenAIRequest(`files/${fileId}`, 'GET');
            return response;
        }, `fetch file info for ${fileId}`);
    } catch (error) {
        logError(`Failed to get file info for ${fileId}: ${error.message}`);
        return null;
    }
}

// Add function to get git remote URL
async function getGitRemoteUrl() {
    try {
        return new Promise((resolve, reject) => {
            exec('git config --get remote.origin.url', (error, stdout, stderr) => {
                if (error) {
                    logWarning(`Failed to get git remote URL: ${error.message}`);
                    // Fallback to a default name
                    resolve('deepgram-content-docs');
                    return;
                }
                const url = stdout.trim();
                // Convert URL to a name-friendly format
                const sanitizedUrl = url
                    .replace(/^https?:\/\//, '')  // Remove protocol
                    .replace(/^git@/, '')         // Remove git@ prefix
                    .replace(/\.git$/, '')        // Remove .git suffix
                    .replace(/[^\w-]/g, '-')      // Replace non-word chars with hyphens
                    .replace(/-+/g, '-')          // Collapse multiple hyphens
                    .toLowerCase();
                
                logInfo(`Using git remote URL as vector store name base: ${sanitizedUrl}`);
                resolve(sanitizedUrl);
            });
        });
    } catch (error) {
        logWarning(`Error getting git remote: ${error.message}`);
        return 'deepgram-content-docs';
    }
}

// Add function to create a new vector store
async function createVectorStore(name) {
    try {
        logInfo(`Creating new vector store with name: ${name}`);
        
        return await withRetry(async () => {
            const response = await makeOpenAIRequest('vector_stores', 'POST', {
                name: name
            });
            
            logSuccess(`Vector store created successfully with ID: ${response.id}`);
            return response.id;
        }, `create vector store ${name}`);
    } catch (error) {
        logError(`Failed to create vector store: ${error.message}`);
        throw error;
    }
}

// Main function
async function main() {
    try {
        logInfo('Starting vector store update process...');
        
        // Load metadata file
        const metadata = loadMetadata();
        
        // Check if OPENAI_API_KEY is set
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            logError('OPENAI_API_KEY environment variable is not set');
            process.exit(1);
        } else {
            logSuccess(`OPENAI_API_KEY is set: ${apiKey.substring(0, 5)}${'*'.repeat(10)}`);
        }
        
        // Handle vector store ID
        let vectorStoreId = metadata.vectorStoreId;
        
        // If no vector store ID in env or metadata, create a new one
        if (!vectorStoreId) {
            const gitRemoteBase = await getGitRemoteUrl();
            // Add timestamp to ensure uniqueness
            const storeName = `${gitRemoteBase}-${new Date().toISOString().replace(/[:.]/g, '-')}`;
            
            const shouldCreate = await confirmAction(`No vector store ID found. Create a new vector store named "${storeName}"?`);
            
            if (shouldCreate) {
                vectorStoreId = await createVectorStore(storeName);
                // Save the new vector store ID to metadata
                metadata.vectorStoreId = vectorStoreId;
                saveMetadata(metadata);
                logSuccess(`New vector store created and saved to metadata: ${vectorStoreId}`);
            } else {
                logError('Vector store ID is required. Please set OPENAI_VECTOR_STORE_ID environment variable or allow creation of a new store.');
                process.exit(1);
            }
        } else {
            logInfo(`Using vector store ID: ${vectorStoreId}`);
            
            // If ID was from env var but not in metadata, save it
            if (process.env.OPENAI_VECTOR_STORE_ID && !metadata.vectorStoreId) {
                metadata.vectorStoreId = vectorStoreId;
                saveMetadata(metadata);
                logInfo(`Saved vector store ID to metadata: ${vectorStoreId}`);
            }
        }
        
        // Verify vector store exists
        const vectorStoreExists = await verifyVectorStore(vectorStoreId);
        if (!vectorStoreExists) {
            logError(`Vector store ${vectorStoreId} does not exist.`);
            
            // If the ID was from metadata, offer to create a new one
            if (!process.env.OPENAI_VECTOR_STORE_ID && metadata.vectorStoreId) {
                const shouldCreate = await confirmAction('Create a new vector store instead?');
                
                if (shouldCreate) {
                    const gitRemoteBase = await getGitRemoteUrl();
                    const storeName = `${gitRemoteBase}-${new Date().toISOString().replace(/[:.]/g, '-')}`;
                    
                    vectorStoreId = await createVectorStore(storeName);
                    // Update the vector store ID in metadata
                    metadata.vectorStoreId = vectorStoreId;
                    saveMetadata(metadata);
                    logSuccess(`New vector store created and saved to metadata: ${vectorStoreId}`);
                } else {
                    logError('Exiting without a valid vector store.');
                    process.exit(1);
                }
            } else {
                logError('Exiting.');
                process.exit(1);
            }
        }
        
        // Check for previous failures in metadata
        let docFiles = [];
        let isRetryMode = false;
        
        const failureCount = Object.keys(metadata.failures || {}).length;
        if (failureCount > 0) {
            logInfo(`Found ${failureCount} previously failed files in metadata`);
            
            // Get list of failed files that still exist
            const failedFiles = Object.values(metadata.failures)
                .map(failure => failure.path)
                .filter(filePath => fs.existsSync(filePath));
            
            if (failedFiles.length > 0) {
                logInfo(`${failedFiles.length} of these files still exist`);
                
                for (let i = 0; i < Math.min(5, failedFiles.length); i++) {
                    const failure = metadata.failures[failedFiles[i]];
                    logInfo(`  Failed file: ${failure.path} - Error: ${failure.error} - Attempts: ${failure.attemptCount}`);
                }
                
                if (failedFiles.length > 5) {
                    logInfo(`  ... and ${failedFiles.length - 5} more`);
                }
                
                const shouldRetry = await confirmAction(`Do you want to retry uploading these ${failedFiles.length} previously failed files?`);
                
                if (shouldRetry) {
                    isRetryMode = true;
                    docFiles = failedFiles;
                    logInfo(`Retry mode enabled. Will try to upload ${docFiles.length} previously failed files.`);
                    
                    // No need to delete the failures from metadata yet, we'll do that on success
                }
            } else {
                logInfo('No previously failed files exist anymore, clearing failure records');
                metadata.failures = {};
                saveMetadata(metadata);
            }
        }
        
        // If not in retry mode, proceed with normal operation
        if (!isRetryMode) {
            // Get all Markdown files from the docs directory
            const docsDirectory = 'articles/en/docs';
            docFiles = getAllFiles(docsDirectory);
            logInfo(`Found ${docFiles.length} Markdown files in ${docsDirectory}`);
        }
        
        // Get all existing files in the vector store
        const existingFiles = await getVectorStoreFiles(vectorStoreId);
        logInfo(`Found ${existingFiles.length} existing files in the vector store`);
        
        // Create a map of file IDs to filenames using our metadata as the primary source
        // since the vector store API doesn't return filenames
        const existingFileMap = {};
        const fileIdToInfo = {};
        
        // First, add all known file IDs from our metadata
        for (const [relativePath, fileInfo] of Object.entries(metadata.files || {})) {
            if (fileInfo.fileId && fileInfo.filename) {
                fileIdToInfo[fileInfo.fileId] = {
                    id: fileInfo.fileId,
                    filename: fileInfo.filename,
                    knownPath: relativePath,
                    fromMetadata: true
                };
            }
        }
        
        // Now, process the files from the vector store
        for (const file of existingFiles) {
            // Store the file info with either known filename from metadata or null
            fileIdToInfo[file.id] = fileIdToInfo[file.id] || {
                id: file.id,
                filename: null, // The API doesn't return filenames
                knownPath: null,
                fromMetadata: false
            };
            
            // If we have a filename from metadata, use it for mapping
            const info = fileIdToInfo[file.id];
            if (info.filename) {
                existingFileMap[info.filename] = file.id;
            }
        }
        
        // Log summary of our file mapping
        const knownFilenameCount = Object.keys(existingFileMap).length;
        const unknownFiles = existingFiles.filter(file => !fileIdToInfo[file.id]?.filename);
        
        logInfo(`Mapped ${knownFilenameCount} files with known filenames from metadata`);
        if (unknownFiles.length > 0) {
            logInfo(`Found ${unknownFiles.length} files in vector store with no filename information in metadata`);
        }
        
        // Prepare lists for tracking actions
        const filesToUpdate = [];
        const filesToAdd = [];
        const filesToDelete = [];
        const unchangedFiles = [];
        
        // Determine which files need to be updated/added based on metadata and remote info
        for (const filePath of docFiles) {
            const filename = path.basename(filePath);
            const normalizedName = normalizeFilename(filename);
            const relativePath = path.relative(process.cwd(), filePath);
            
            logInfo(`Checking local file: ${filename} → ${normalizedName}`);
            
            // Check if file exists in our metadata
            if (metadata.files[relativePath] && metadata.files[relativePath].fileId) {
                const metadataFileId = metadata.files[relativePath].fileId;
                
                // Check if the metadataFileId exists in the current vector store
                const existsInVectorStore = existingFiles.some(file => file.id === metadataFileId);
                
                if (existsInVectorStore) {
                    logInfo(`Found file in metadata and vector store: ${relativePath} (ID: ${metadataFileId})`);
                    
                    // Check if content has changed (MD5 comparison)
                    if (fileNeedsUpdate(metadata, filePath)) {
                        logInfo(`Content change detected, will update: ${relativePath}`);
                        filesToUpdate.push({
                            path: filePath,
                            filename: normalizedName,
                            existingId: metadataFileId
                        });
                    } else {
                        logInfo(`Content unchanged, skipping update: ${relativePath}`);
                        unchangedFiles.push({
                            path: filePath,
                            filename: normalizedName,
                            existingId: metadataFileId
                        });
                    }
                    
                    // Remove from list of files to track what's been processed
                    const fileIndex = existingFiles.findIndex(file => file.id === metadataFileId);
                    if (fileIndex !== -1) {
                        existingFiles.splice(fileIndex, 1);
                    }
                } else {
                    // In metadata but not in vector store - need to reupload
                    logInfo(`File in metadata but not found in vector store: ${relativePath}`);
                    filesToAdd.push({
                        path: filePath,
                        filename: normalizedName
                    });
                }
            } else {
                // Not in metadata, check if filename matches something in vector store
                if (existingFileMap[normalizedName]) {
                    const matchingFileId = existingFileMap[normalizedName];
                    const fileInfo = fileIdToInfo[matchingFileId];
                    
                    logInfo(`File not in metadata but found in vector store by name: ${relativePath} (ID: ${matchingFileId})`);
                    
                    // Update our metadata to record this relationship
                    metadata.files[relativePath] = {
                        fileId: matchingFileId,
                        filename: normalizedName,
                        vectorStoreId: vectorStoreId,
                        localPath: relativePath,
                        lastUploaded: new Date().toISOString(), // Assume it's fresh since we just found it
                        fileSizeBytes: fs.statSync(filePath).size,
                        md5Hash: calculateMd5(filePath)
                    };
                    
                    // We'll assume a newly matched file needs an update to ensure its content matches
                    // This avoids an unnecessary API call but ensures content is synced
                    filesToUpdate.push({
                        path: filePath,
                        filename: normalizedName,
                        existingId: matchingFileId
                    });
                    
                    // Remove from list of existing files
                    const fileIndex = existingFiles.findIndex(file => file.id === matchingFileId);
                    if (fileIndex !== -1) {
                        existingFiles.splice(fileIndex, 1);
                    }
                } else {
                    // New file, needs to be added
                    logInfo(`No match found in vector store or metadata for: ${normalizedName}`);
                    filesToAdd.push({
                        path: filePath,
                        filename: normalizedName
                    });
                }
            }
        }
        
        // Any files left in existingFiles are in the vector store but not matched to local files
        if (existingFiles.length > 0) {
            logInfo(`Found ${existingFiles.length} files in vector store with no matching local file`);
            
            for (const file of existingFiles) {
                const info = fileIdToInfo[file.id];
                const displayName = info?.filename || `unknown (ID: ${file.id})`;
                
                filesToDelete.push({
                    filename: displayName,
                    id: file.id
                });
            }
        }
        
        // Log the plan
        logInfo('File update plan:');
        logInfo(`- Files to update: ${filesToUpdate.length}`);
        logInfo(`- New files to add: ${filesToAdd.length}`);
        logInfo(`- Files to delete: ${filesToDelete.length}`);
        logInfo(`- Unchanged files: ${unchangedFiles.length}`);
        
        // Confirm the plan
        if (!isRetryMode && (filesToUpdate.length > 0 || filesToAdd.length > 0 || filesToDelete.length > 0)) {
            const shouldProceed = await confirmAction('Do you want to proceed with this update plan?');
            if (!shouldProceed) {
                logInfo('Update cancelled. Exiting...');
                process.exit(0);
            }
        }
        
        // Track failures
        const failedFiles = [];
        
        // Process files to update (delete and re-upload)
        if (filesToUpdate.length > 0) {
            logInfo('Processing files that need updating...');
            
            for (let i = 0; i < filesToUpdate.length; i++) {
                const fileInfo = filesToUpdate[i];
                try {
                    logInfo(`Updating file ${i + 1} of ${filesToUpdate.length}: ${fileInfo.path}`);
                    
                    // Delete the existing file
                    logInfo(`Deleting existing file: ${fileInfo.existingId}`);
                    await deleteFileFromVectorStore(vectorStoreId, fileInfo.existingId);
                    
                    // Wait after deletion to respect rate limits
                    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_CONFIG.FILE_UPLOAD_DELAY));
                    
                    // Upload the new version
                    const uploadInfo = await createUpload(fileInfo.path);
                    const uploadData = await uploadFileInChunks(uploadInfo);
                    const fileId = await completeUpload(uploadData);
                    
                    // Record the updated file in metadata BEFORE adding to vector store
                    recordFileUpload(metadata, fileInfo.path, fileId, vectorStoreId);
                    
                    // Add the file to the vector store with attributes
                    await addFileToVectorStore(vectorStoreId, fileId, fileInfo.path, metadata);
                    
                    // Clear any previous failure record on success
                    clearFileFailure(metadata, fileInfo.path);
                    
                    logSuccess(`Successfully updated: ${fileInfo.path}`);
                } catch (error) {
                    logError(`Failed to update ${fileInfo.path}: ${error.message}`);
                    failedFiles.push({
                        path: fileInfo.path,
                        error: error.message
                    });
                    
                    // Record the failure in metadata
                    recordFileFailure(metadata, fileInfo.path, error);
                }
                
                // Add delay between files
                if (i < filesToUpdate.length - 1) {
                    logInfo(`Waiting ${RATE_LIMIT_CONFIG.FILE_UPLOAD_DELAY}ms before processing next file...`);
                    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_CONFIG.FILE_UPLOAD_DELAY));
                }
            }
        }
        
        // Process new files to add
        if (filesToAdd.length > 0) {
            logInfo('Processing new files to add...');
            
            for (let i = 0; i < filesToAdd.length; i++) {
                const fileInfo = filesToAdd[i];
                try {
                    logInfo(`Processing new file ${i + 1} of ${filesToAdd.length}: ${fileInfo.path}`);
                    
                    // Upload the file
                    const uploadInfo = await createUpload(fileInfo.path);
                    const uploadData = await uploadFileInChunks(uploadInfo);
                    const fileId = await completeUpload(uploadData);
                    
                    // Record the new file in metadata BEFORE adding to vector store
                    recordFileUpload(metadata, fileInfo.path, fileId, vectorStoreId);
                    
                    // Add the file to the vector store with attributes
                    await addFileToVectorStore(vectorStoreId, fileId, fileInfo.path, metadata);
                    
                    // Clear any previous failure record on success
                    clearFileFailure(metadata, fileInfo.path);
                    
                    logSuccess(`Successfully added new file: ${fileInfo.path}`);
                } catch (error) {
                    logError(`Failed to process ${fileInfo.path}: ${error.message}`);
                    failedFiles.push({
                        path: fileInfo.path,
                        error: error.message
                    });
                    
                    // Record the failure in metadata
                    recordFileFailure(metadata, fileInfo.path, error);
                }
                
                // Add delay between files
                if (i < filesToAdd.length - 1) {
                    logInfo(`Waiting ${RATE_LIMIT_CONFIG.FILE_UPLOAD_DELAY}ms before processing next file...`);
                    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_CONFIG.FILE_UPLOAD_DELAY));
                }
            }
        }
        
        // Process files to delete (files in vector store but not in docs directory)
        if (filesToDelete.length > 0) {
            logInfo('Processing files to delete from vector store...');
            
            for (let i = 0; i < filesToDelete.length; i++) {
                const fileInfo = filesToDelete[i];
                try {
                    logInfo(`Deleting file ${i + 1} of ${filesToDelete.length}: ${fileInfo.filename} (ID: ${fileInfo.id})`);
                    await deleteFileFromVectorStore(vectorStoreId, fileInfo.id);
                    logSuccess(`Successfully deleted ${fileInfo.filename}`);
                } catch (error) {
                    logError(`Failed to delete ${fileInfo.filename}: ${error.message}`);
                }
                
                // Add delay between deletions
                if (i < filesToDelete.length - 1) {
                    logInfo(`Waiting ${RATE_LIMIT_CONFIG.FILE_UPLOAD_DELAY}ms before next deletion...`);
                    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_CONFIG.FILE_UPLOAD_DELAY));
                }
            }
        }
        
        // Report on failures if any
        if (failedFiles.length > 0) {
            logWarning(`${failedFiles.length} files failed to process.`);
            logInfo('Failed files have been recorded in the metadata file.');
            logInfo('Run this script again to retry these files.');
        } else if (isRetryMode) {
            // All files processed successfully in retry mode, clear failures
            logSuccess('All retry files were processed successfully!');
            
            // Clear all failure records
            for (const filePath of docFiles) {
                clearFileFailure(metadata, filePath);
            }
        }
        
        // Save the updated metadata
        saveMetadata(metadata);
        
        // Report summary
        logSuccess('Vector store update completed!');
        logInfo('Summary:');
        logInfo(`- Updated: ${filesToUpdate.length - failedFiles.filter(f => filesToUpdate.some(u => u.path === f.path)).length} files`);
        logInfo(`- Added: ${filesToAdd.length - failedFiles.filter(f => filesToAdd.some(a => a.path === f.path)).length} files`);
        logInfo(`- Deleted: ${filesToDelete.length} files`);
        logInfo(`- Unchanged: ${unchangedFiles.length} files`);
        logInfo(`- Failed: ${failedFiles.length} files`);
    } catch (error) {
        logError(`Error in main process: ${error.message}`);
        process.exit(1);
    }
}

main(); 