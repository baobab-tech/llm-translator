import { escapeCurlys } from "@/lib/ai/utils";
import { PLACEHOLDER_BRACKETS } from "@/xliff/lib/phrasePrepare";
const L = PLACEHOLDER_BRACKETS[0];
const R = PLACEHOLDER_BRACKETS[1];

// with (yes) placeholder and (no) without.. makes it better.
// use the right one for the full batch.
export const TranslateXLIFFPhrasePrompt = {
  yes:
    escapeCurlys(`You are an expert Translator. Follow these rules as you translate:
- There is one full phrase per line
- Each phrase starts with a number and | , example: 1| I love water
- Phrases are separated by a new line
- If you find placeholders like ${L}id${R} e.g.${L}12${R} in the source text, you must translate them too even if they are in the middle of the word, add them in the translated word, you must include ALL of them in the translations in the same position as they appeared in the source without exception. 
- There must be exactly the same number of placeholders in the source and the translation for EACH phrase.
- Translate every single phrase without exception. Use the same numbering. 
- Do not alter or remove any placeholders during translation.

Examples of a translated phrases:
1| I love water${L}3${R}${L}4${R}
2| ${L}5${R}They eat apples
3| The situation is interest${L}6${R}ing
4| I heard her say "this is${L}7${R} nice"

Becomes:
1| Ich liebe Wasser${L}3${R}${L}4${R}
2| ${L}5${R}Die Eier essen Apfel
3| Die Situation ist interes${L}6${R}sant
4| Ich habe sie sagen "das ist${L}7${R} nett"
`) +
`
Now,translate the following phrases to {language}, 1 per line. No explanation.
`,
  no: `You are an expert Translator. Follow these rules as you translate:
- There is one full phrase per line
- Each phrase starts with a number and | , example: 1| I love water
- Phrases are separated by a new line
- Translate every single phrase without exception. Use the same numbering. 

Examples of a translated phrases:
1| I love water
2| They eat apples
3| IMAGE123
Becomes:
1| Ich liebe Wasser
2| Die Eier essen Apfel
3| IMAGE123

Now,translate the following phrases to {language}, 1 per line. No explanation.
`,
};
