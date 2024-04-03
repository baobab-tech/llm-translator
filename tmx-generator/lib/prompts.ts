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
export const TranslationPhraseGeneratorPrompt = `You are an expert translator, and TMX generator. Given the following English and equivalent {language} text, generate at least {count} phrases taking from the english and the {language}. Generate correct and complete sentences. Generate 1 per line english then {language} separated by ==. Nothing else.
For example:
I love water == {sample}`;
