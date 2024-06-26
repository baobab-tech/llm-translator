import { ParsedXliff, parseXLIFFContent } from "./parseXliff";
import {
  refillTextWithOriginalTags,
  replaceTagsAndStoreMappings,
} from "./phrasePrepare";

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
      if(tu.source.trim()) { // don't both extracting empty phrases
      let { text, map } = replaceTagsAndStoreMappings(tu.source, index);
      index += Object.keys(map).length;
      // store the text, namespace and map into a object
      
      // if there are any new lines in the text replace it
      // @TODO: this is because we batch translate and use newlines in the LLM to split... we should change this but not sure how because doing 1 phrase at a time would cost a huge amount
      text = text.replace(/\n/g, ' ');
      phrasesForTranslation.push({ namespace, tuId: tu.id, text, map });
      // const translatedPhrase = await translateMe(text, language);
      // tu.target = refillTextWithOriginalTags(translatedPhrase, map);
      }
    });
  });
  // console.log("XXX",phrasesForTranslation.length)
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
    if (!text) return obj;
    const tu = obj[namespace].find((tu) => tu.id === tuId);
    if (!tu)
      throw new Error(`Cannot find tu ${tuId} in namespace ${namespace}`);

    tu.target = refillTextWithOriginalTags(text, map);
  });
  return obj;
};
