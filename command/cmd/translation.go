/*
Copyright © 2024 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"context"
	"errors"
	"fmt"

	"github.com/openai/openai-go"
	"github.com/spf13/cobra"

	"deepgram-content/internal/config"
	"deepgram-content/internal/utils"
)

// translationCmd represents the translation command
var translationCmd = &cobra.Command{
	Use:   "translation",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Args: func(cmd *cobra.Command, args []string) error {
		if len(args) < 1 {
			return errors.New("requires at least one arg")
		}

		// is filepath and markdown file
		if utils.FilePath(args[0]) && utils.MarkdownFile(args[0]) {
			return nil
		}

		return fmt.Errorf("invalid file specified: %s", args[0])
	},
	Run: runTranslation,
}

func init() {
	rootCmd.AddCommand(translationCmd)
}

func runTranslation(cmd *cobra.Command, args []string) {
	prompt := config.GenerateTranslatePrompt()
	schema := config.GenerateSchema[config.MarkdownArray]()

	content, err := utils.FileContents(args[0])
	if err != nil {
		panic(err.Error())
	}

	schemaParam := openai.ResponseFormatJSONSchemaJSONSchemaParam{
		Name:        openai.F("translation"),
		Description: openai.F("Results of translating a markdown document into multiple languages."),
		Schema:      openai.F(schema),
		Strict:      openai.Bool(true),
	}

	client := openai.NewClient()
	chatCompletion, err := client.Chat.Completions.New(context.TODO(), openai.ChatCompletionNewParams{
		Messages: openai.F([]openai.ChatCompletionMessageParamUnion{
			openai.SystemMessage(prompt),
			openai.UserMessage(content),
		}),
		Model: openai.F(openai.ChatModelGPT4o),
		ResponseFormat: openai.F[openai.ChatCompletionNewParamsResponseFormatUnion](
			openai.ResponseFormatJSONSchemaParam{
				Type:       openai.F(openai.ResponseFormatJSONSchemaTypeJSONSchema),
				JSONSchema: openai.F(schemaParam),
			},
		),
	})

	if err != nil {
		panic(err.Error())
	}

	fmt.Print("test", args[0], chatCompletion)
}
