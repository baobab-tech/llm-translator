/**
 * When you only have a doc in the target language (no english)
 * Use this to get a base translation that you can use as the pair text
 * @param language
 */
export const SingleSourceTranslatorPrompt = `You are an expert translator, from {language} to English. You make sure the english is correct and as close as possible to the {language}. Translate the following no explanation.`;

/**
 * When you only have a doc in the target language (no english)
 * Use this to generate the tmx translation units.
 * @param language
 * @param sample - translation of "I love water"
 */
export const TranslationPhraseGeneratorPrompt = `You are an expert translator, and TMX generator. Given the following {language} text, extract {count} phrases and generate correct and complete translations to English. Generate 1 per line: english then {language} separated by ===. Do not number the lines. No explanation or comments.
For example:
I love water === {sample}`;
