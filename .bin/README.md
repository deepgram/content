# Content Scripts

This directory contains utility scripts for managing content and documentation. Each script is designed to be run directly from the command line.

## Requirements

All scripts require Node.js and access to the necessary environment variables. Before running any script, ensure you have:

1. Node.js installed
2. Created a `.env` file in the project root with required API keys (primarily `OPENAI_API_KEY`)

## Zero Dependencies

These scripts are designed free of dependencies to run without additional steps. Just install node and run the scripts.

## Available Scripts

### community_review.js

Reviews community-contributed articles for quality and accuracy against Deepgram documentation guidelines.

**Usage:**

```bash
node .bin/community_review.js [path/to/article.mdx]
```

If no article path is provided, the script will randomly select a community article to review. The script:

- Analyzes the article content against Deepgram documentation standards
- Searches vectorized documentation for related content to verify accuracy
- Provides detailed improvement recommendations
- Checks compliance with British English style guidelines

### translate.js

Translates English documentation articles to Spanish.

**Usage:**

```bash
node .bin/translate.js [path/to/article.mdx]
```

If no article path is provided, the script will randomly select an untranslated article. The script:

- Reads the English article from the `articles/en` directory
- Preserves frontmatter, code blocks, and special formatting
- Translates content to Spanish using OpenAI's API
- Adds language links to both English and Spanish versions
- Saves the Spanish article to the corresponding path in the `articles/es` directory

### vectorize_docs.js

Creates and manages vector embeddings of documentation content for semantic search capabilities.

**Usage:**

```bash
node .bin/vectorize_docs.js
```

This script:

- Scans for Markdown files in the articles directory
- Creates and manages an OpenAI vector store
- Uploads and updates documents in the vector store
- Tracks file changes using MD5 hashing to minimize API calls
- Maintains metadata about uploaded files in `vectorstore_metadata.json`

## Metadata Files

### vectorstore_metadata.json

This file tracks the state of documents uploaded to the OpenAI vector store. It contains:

- File paths and IDs
- Vector store IDs
- File hashes for change detection
- Upload timestamps and file sizes

This file is automatically maintained by the `vectorize_docs.js` script and should not be edited manually.

## Automated Workflows

These scripts can run manually as described above, but they're also integrated into automated workflows.

### Daily Translation Workflow

Located at `.github/workflows/daily-translation.yml`, this GitHub Actions workflow automatically translates articles to Spanish on a regular schedule.

**Workflow Details:**

- **Schedule**: Runs at midnight UTC daily
- **Manual Triggering**: Can also be triggered manually via GitHub Actions UI
- **Process**:
  1. Creates a new branch named `translation/YYYY-MM-DD`
  2. Executes the translation script to translate one article
  3. Commits the new Spanish translation
  4. Updates the English article with links to the Spanish version
  5. Creates a pull request for review

**Configuration**:

- Requires `OPENAI_API_KEY` secret to be configured in the GitHub repository
- No additional configuration needed

## Troubleshooting

### Common Issues

1. **API Key Issues**: If you encounter authentication errors, verify your `OPENAI_API_KEY` is correctly set in your `.env` file.

2. **Rate Limiting**: The vectorize_docs.js script has built-in rate limiting and retry logic. If you're experiencing rate limit errors, check the `RATE_LIMIT_CONFIG` object in the script.

3. **File Path Issues**: When running scripts with specific file paths, ensure you're using paths relative to the project root.

### Environment Setup

For local development, create a `.env` file at the project root with:

```env
OPENAI_API_KEY=your_openai_api_key
```

## Integration with Content Workflow

These scripts support a content workflow where:

1. Documentation is indexed into vector storage using `vectorize_docs.js`
2. Community content is automatically generated and reviewed using `community_review.js`
3. Content is automatically translated to Spanish using `translate.js` via the daily workflow

For large-scale updates to the documentation, run the vectorize_docs.js script manually after merging changes to ensure the vector store remains current.
