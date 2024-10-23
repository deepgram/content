package config

import (
	"fmt"
	"strings"

	"github.com/invopop/jsonschema"
)

// GetAllLanguages returns all language constants as an array
func GetAllLanguages() []string {
	return []string{LanguageFrench, LanguageSpanish, LanguagePortuguese, LanguageGerman, LanguageJapanese, LanguageChinese, LanguageTagalog}
}

// GenerateTranslateMarkdownPrompt creates a markdown prompt for translation
func GenerateTranslatePrompt() string {
	languages := GetAllLanguages()
	return fmt.Sprintf(TranslateSystemPrompt, fmt.Sprintf(`["%s"]`, strings.Join(languages, `", "`)))
}

// Document represents each item in the documents array
type Document struct {
	Language string `json:"language" jsonschema_description:"The language of the markdown content."`
	Markdown string `json:"markdown" jsonschema_description:"The markdown-formatted content."`
}

// MarkdownArray represents the main object that contains the array of documents
type MarkdownArray struct {
	Documents []Document `json:"documents" jsonschema_description:"An array of documents each containing a language and markdown content."`
}

// GenerateSchema is a generic function that generates a JSON schema for a given type
func GenerateSchema[T any]() interface{} {
	reflector := jsonschema.Reflector{
		AllowAdditionalProperties: false,
		DoNotReference:            true,
	}
	var v T
	schema := reflector.Reflect(v)
	return schema
}
