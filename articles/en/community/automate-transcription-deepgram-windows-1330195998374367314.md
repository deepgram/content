# Automating Transcription of Audio Files using Deepgram on Windows

When managing large collections of audio files, automating the transcription process can save significant time and effort. This guide explains how to automate transcription of audio files using Deepgram's Nova model on a Windows system. By following these steps, users can efficiently convert .m4a, .aac, and .opus files into transcriptions with diarization.

## Setting Up the Environment

Before proceeding, ensure you have the following prerequisites:

- An API key for Deepgram's transcription service.
- **Curl**: A command-line tool for transferring data with URLs. [Install Curl](https://curl.se/docs/install.html)

## Creating the Batch File

You can create a batch file that automates the process of uploading audio files to Deepgram and saving the transcriptions. 

Here's an example:

1. **Open Notepad** and paste the following script:

```batch
   @echo off
setlocal enableextensions
set "api_key=YOUR_DEEPGRAM_API_KEY"
set "model=nova"
for %%f in ("*.m4a" "*.aac" "*.opus") do (
    echo Processing "%%~nf"
    curl -X POST \
    --data-binary @"%%f" \
    -H "Content-Type: audio/m4a" \  
    -H "Authorization: Token %api_key%" \
    "https://api.deepgram.com/v1/listen?model=%model%" > "%%~nf.txt"
)
endlocal
echo Transcription complete.
pause
```

2. **Replace `YOUR_DEEPGRAM_API_KEY`** with your actual Deepgram API key.

3. **Adjust Content-Type Header** based on the file type if necessary (e.g., `audio/aac` for AAC files).

4. Save the file with a `.bat` extension (e.g., `transcribe.bat`).

## Execution

- Place the batch file in the directory containing your audio files.
- Double-click the batch file to run. Each audio file will be processed, uploaded to Deepgram, and the resulting transcription will be saved with the same name in a `.txt` format with diarization.

## Notes

- Ensure that each audio file type has the correct content-type header.
- The `for` loop processes files sequentially; large batches may take some time.
- If issues persist or you need further assistance, reach out to your Deepgram support representative or join [our community on Discord](https://discord.gg/deepgram).

By following these instructions, users can swiftly automate the transcription of their audio files using Deepgram's API, saving both time and effort. This process is ideal for anyone regularly working with bulk audio data and requiring efficient transcription. 

## References

- [Deepgram API Documentation](https://developers.deepgram.com/docs/getting-started-with-pre-recorded-audio)
- [Curl Official Documentation](https://curl.se/docs/)
