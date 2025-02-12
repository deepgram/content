package config

const (
	LanguageFrench     = "fr"
	LanguageSpanish    = "es"
	LanguagePortuguese = "pt"
	LanguageGerman     = "de"
	LanguageJapanese   = "jp"
	LanguageChinese    = "zh-cn"
	LanguageTagalog    = "tl"
)

const TranslateSystemPrompt = `{
	"prompt": "Translate the markdown message into all defined languages. In code blocks, only translate comments - not the code, functions, or properties.",
	"languages": %s
}`

const TranslateResponseSchema = `{
  "name": "markdown_array",
  "strict": true,
  "schema": {
    "type": "object",
    "properties": {
      "documents": {
        "type": "array",
        "description": "An array of documents each containing a language and markdown content.",
        "items": {
          "type": "object",
          "properties": {
            "language": {
              "type": "string",
              "description": "The language of the markdown content."
            },
            "markdown": {
              "type": "string",
              "description": "The markdown-formatted content."
            }
          },
          "required": [
            "language",
            "markdown"
          ],
          "additionalProperties": false
        }
      }
    },
    "required": [
      "documents"
    ],
    "additionalProperties": false
  }
}`
