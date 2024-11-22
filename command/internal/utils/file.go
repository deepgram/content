package utils

import (
	"errors"
	"os"
	"regexp"
)

// isFilePath checks if a string looks like a file path
func FilePath(s string) bool {
	// Regular expression to match common file path patterns, including ./ and ../
	// Allow special characters in the file path
	re := regexp.MustCompile(`^(\./|\../|/|[a-zA-Z]:\\)?([^/\\:*?"<>|]+/)*([^/\\:*?"<>|]+)?$`)
	return re.MatchString(s)
}

// isMarkdownFile checks if a file path has a markdown extension
func MarkdownFile(s string) bool {
	// Regular expression to match file paths ending with .md or .markdown
	re := regexp.MustCompile(`(?i)\.(md|markdown)$`)
	return re.MatchString(s)
}

// FileContents reads the contents of a file from disk
func FileContents(path string) (string, error) {
	if !FilePath(path) || !MarkdownFile(path) {
		return "", errors.New("invalid file specified")
	}

	// Read the file contents from disk
	data, err := os.ReadFile(path)
	if err != nil {
		return "", err
	}

	return string(data), nil
}
