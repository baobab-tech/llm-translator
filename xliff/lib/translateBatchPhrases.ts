import { ExtractedPhrase } from "./extractPhrases";
import { TranslateXLIFFPhrasePrompt } from "@/xliff/lib/prompts";
import {
  PLACEHOLDER_BRACKETS,
  refillTextWithOriginalTags,
} from "./phrasePrepare";
import _ from "lodash";
import "dotenv/config";
import { translateWithLLM } from "@/llm-translate/lib/translateWithLLM";
/**
 * We are setting a sensible length of a batch of phrases to be translated at once
 * keeping in ming too many lines (phrases) will make the llm mess up and also
 * too long of a text will make it mess up too
 * so we stop at what ever comes first either the number of characters or the number of phrases
 */
const GROUP_SIZE_CHARS = 700;
const GROUP_SIZE_PHRASES = 8;
const AI_TRANSLATION_MODE = process.env.AI_TRANSLATION_MODE || "off";
//=================
/**
 * Sensitive is also the placeholeder brackets
 */
// see phrasePrepare where they are set PLACEHOLDER_BRACKETS
//================

/**
 * Translates a batch of phrases from XLIFF using the LLM
 * @param {ExtractedPhrase[]} phrases  - phrases to be translated
 * @param {string} language  -
 * @returns {ExtractedPhrase[]}
 */
export const translateBatchXliffPhrases = async (
  phrases: ExtractedPhrase[],
  language: string
) => {
  const groupedPhrases: ExtractedPhrase[][] = [];
  let currentGroup: ExtractedPhrase[] = [];
  let currentCharsCount = 0;

  for (const phrase of phrases) {
    // Check if adding the current phrase would exceed the limits
    // but first check if this one phrase exceeds the limit on its own because if it does, we need to add it else it gets excluded
    if (phrase.text.length > GROUP_SIZE_CHARS) {
      currentGroup.push(phrase);
      groupedPhrases.push(currentGroup);
      currentCharsCount = 0;
      continue;
    }
    if (
      currentCharsCount + phrase.text.length > GROUP_SIZE_CHARS ||
      currentGroup.length == GROUP_SIZE_PHRASES
    ) {
      // Push the current batch to batchedPhrases and reset the counters and current batch
      groupedPhrases.push(currentGroup);
      currentGroup = [];
      currentCharsCount = 0;
    }
    // Add the current phrase to the current batch
    currentGroup.push(phrase);
    currentCharsCount += phrase.text.length;
  }

  // Add any remaining phrases as the last batch
  if (currentGroup.length > 0) {
    groupedPhrases.push(currentGroup);
  }

  const translatedBatches: ExtractedPhrase[][] = [];
  for (let i = 0; i <= groupedPhrases.length - 1; i = i + 7) {
    let batch: any = groupedPhrases.slice(i, i + 7);
    // console.log(batch);
    batch = batch.map(async (group) => translationBatchTask(group, language));
    let translatedBatch = await Promise.all(batch);
    // console.log("** Translated batch:", translatedBatch);
    translatedBatches.push(translatedBatch.flat());
  }

  // console.log(translatedBatches);

  return translatedBatches.flat();
};

async function translationBatchTask(group, language) {
  const batchPhrasesText = group
    .map((phrase, idx) => `${idx + 1}| ${phrase.text}`) // number each phrase per prompt! starting at 1
    .join("\n");

  //   console.log("** Translating text:", batchPhrasesText);
  // merge the map for each phrase into one big map
  const map = _.merge({}, ...group.map((phrase) => phrase.map));
  //   console.log("** Map:", map);
  let translatedBatchText =
    AI_TRANSLATION_MODE == "off"
      ? batchPhrasesText
      : await translateWithLLM(
          batchPhrasesText,
          language,
          // use the prompt that focuses on placeholders or not
          TranslateXLIFFPhrasePrompt[
            batchPhrasesText.includes(PLACEHOLDER_BRACKETS[0]) ? "yes" : "no"
          ]
        );
  // Do a sanity check there should be same number of phrases as batch
  // first remove any blank lines from the translated text
  translatedBatchText = translatedBatchText.replace(/^\s*[\r\n]/gm, "");
  if (
    translatedBatchText.split("\n").length !=
    batchPhrasesText.split("\n").length
  ) {
    console.error(
      "** Error: translated batch length does not match the batch length",
      translatedBatchText
    );
    throw new Error("translated batch length does not match the batch length");
  }
  // Sanity check that there are the same amount of [[id]]
  if (
    translatedBatchText.split(PLACEHOLDER_BRACKETS[0]).length !=
    batchPhrasesText.split(PLACEHOLDER_BRACKETS[0]).length
  ) {
    console.error(
      "** Error: translation PLACEHOLDER count does not match",
      translatedBatchText,
      batchPhrasesText
    );
    throw new Error("translation PLACEHOLDER count does not match");
  }

  console.log(
    `** Translated batch: `,
    `${translatedBatchText.split("\n").length} phrases and ${
      translatedBatchText.split(" ").length
    } words`
  );
  const refilledBatch = refillTextWithOriginalTags(translatedBatchText, map);
  // now split by \n because of the translation prompt,
  const translatedPhrases = refilledBatch
    .split("\n")
    .map((phrase) => phrase.replace(/^\d{1,2}\| /, ""));
  // now replace the translated phrases back into the batch
  group.forEach((phrase, index) => {
    phrase.text = translatedPhrases[index];
  });

  // console.log(batch)

  return group;
}
