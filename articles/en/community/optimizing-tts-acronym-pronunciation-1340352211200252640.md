# Optimizing TTS for Accurate Acronym Pronunciation

In text-to-speech (TTS) applications, accurately pronouncing acronyms can be challenging. This guide provides insights into managing acronym pronunciation effectively using Deepgram's TTS API.

## Understanding Acronym Pronunciation

Acronyms, such as "ABC" or "USP," can sometimes be articulated as words (e.g., "abse" instead of "A-B-C") by TTS systems. This often occurs due to the system interpreting the letters as a unit rather than individual characters. 

### Deepgram's Approach to Acronym Pronunciation

Unlike some TTS systems, Deepgram does not support SSML (Speech Synthesis Markup Language). Instead, Deepgram offers its own prompting techniques to control acronym pronunciation.

In most cases, Deepgram's Aura model will attempt to determine whether an acronym should be pronounced as individual letters or as a word. For more precise control, you can use the following techniques:

1. **Spelled-out Letters**: For acronyms you want pronounced as individual letters, use spelled-out versions of each letter:

```text
"The alphabets are Eigh, Beee, Sea, Deee, Eeeee, Eff, Geee, Aitch, Eye, Jay, Kay, Elle, Emm, En, Owe, Peee, Queue, Ar, Ess, Teee, Yue, Veee, Double Yue, Eks, Why, Zeee."
```

2. **Spacing with Periods**: Add natural pauses between groups of letters by including periods:

```text
"To confirm, is your referral code Queue Why. Eigh Beee?"
```

### Implementation Examples

For acronyms like "NBA" that should be pronounced as individual letters:

```json
{
  "text": "I love watching En Beee Eigh Basketball.",
  "model": "aura-asteria-en"
}
```

For acronyms like "NASA" that are typically pronounced as words, you can use the standard format, as Deepgram will handle common acronyms appropriately:

```json
{
  "text": "NASA launched a new satellite yesterday.",
  "model": "aura-asteria-en"
}
```

## Testing and Optimization

Always test how your acronyms are pronounced in context:

1. **Context Matters**: The same acronym might need different treatment in different contexts
2. **Common vs. Uncommon**: Common acronyms are often handled correctly by default
3. **Consistency**: Maintain consistent pronunciation of acronyms throughout your application

## Conclusion

While Deepgram does not support SSML for pronunciation control, its prompting system provides effective ways to manage acronym pronunciation. By following Deepgram's prompting guidelines, you can achieve clear and accurate pronunciation of acronyms in your TTS applications.

For persistent issues or inconsistencies, engage with the community via [Discord](https://discord.gg/deepgram) for further assistance.

## References

- [Deepgram TTS API Documentation](https://developers.deepgram.com/docs/tts-rest)
- [Deepgram TTS Prompting Guide](https://developers.deepgram.com/docs/text-to-speech-prompting)
