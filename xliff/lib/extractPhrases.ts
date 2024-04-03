import { ParsedXliff, parseXLIFFContent } from "./parseXliff.js";
import {
  refillTextWithOriginalTags,
  replaceTagsAndStoreMappings,
} from "./phrasePrepare.js";

export type ExtractedPhrase = {
  namespace: string;
  tuId: string;
  text: string;
  map: { [placeholder: string]: string };
};
/**
 * Extract the phrases from xliff file with mappings lile {{1}} and {{2}} for tags to be replaced later
 * This is used to prepare the phrases for batch translation
 * @param docString - string of the xliff file
 * @returns
 */
export const extractPhrases = async (docString: string) => {
  const obj = await parseXLIFFContent(docString);
  let phrasesForTranslation: ExtractedPhrase[] = [];
  Object.keys(obj).forEach((namespace) => {
    let index = 0; // the tag mapping index
    obj[namespace].forEach((tu) => {
      const { text, map } = replaceTagsAndStoreMappings(tu.source, index);
      index += Object.keys(map).length;
      // store the text, namespace and map into a object
      phrasesForTranslation.push({ namespace, tuId: tu.id, text, map });
      // const translatedPhrase = await translateMe(text, language);
      // tu.target = refillTextWithOriginalTags(translatedPhrase, map);
    });
  });
  return phrasesForTranslation;
};

/**
 * Merge phrase back into ParsedXliff structure for
 * adding into the xliff
 * @param phrases - the phrases to be merged back with mapping of e.g. {{2}} tags
 * @param obj - the ParsedXliff structure of the full original xliff
 */
export const mergePhrasesBack = (
  phrases: ExtractedPhrase[],
  obj: ParsedXliff
): ParsedXliff => {
  phrases.forEach((phrase) => {
    const { namespace, tuId, text, map } = phrase;
    const tu = obj[namespace].find((tu) => tu.id === tuId);
    if (!tu)
      throw new Error(`Cannot find tu ${tuId} in namespace ${namespace}`);

    tu.target = refillTextWithOriginalTags(text, map);
  });
  return obj;
};
