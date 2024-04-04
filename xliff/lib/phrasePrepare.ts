/**
 *
 *  Prepare phrases from an XLIFF for use with LLMs
 *  We assume LLMs suck at translating back phrases with the <bpt> <ept> from XLIFFs
 *  so we wil reaplce all tags with placeholders {{1}} for a cleaner phrase to the LLM
 *  then switch them back for XLIFF completion
 *
 */

import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('123456789abcdef', 4)

/**
 * !!!!
 * Different LLMs are sensitive to different brackets
 *  gpt3.5 likes < > or [[ ]]
 *  command-r likes 【 】 but hates < > 
 */
export const PLACEHOLDER_BRACKETS = ["【", "】"] // ["【", "】"];


interface TagMapping {
  [placeholder: string]: string;
}

/**
 * Replaces XML/HTML tags in the input text with placeholders starting from a specified initial counter value,
 * and stores the original tags in a mapping object. This function is generic and works for any tag names and attributes.
 *
 * @param inputText The input string containing XML/HTML tags to be replaced.
 * @param initialCounter The initial value for the placeholders. Defaults to 1 if not specified.
 * @returns {{text, map}} {text, map} - An object the modified text with placeholders and a mapping object that maps each placeholder to its original tag.
 *
 * @example
 * const inputText = `Mind Tools (2022). <bpt id="1">&lt;run1></bpt>SWOT Analysis<bpt id="2">&lt;run2></bpt>: <ept id="2">&lt;/run2></ept><ept id="1">&lt;/run1></ept><bpt id="3">&lt;run3></bpt>Understanding Your Business, Informing Your Strategy.`;
 * const [outputText, tagMappings] = replaceTagsAndStoreMappings(inputText, 1);
 */
export function replaceTagsAndStoreMappings(
  inputText: string,
  initialCounter: number = 1
): { text: string; map: TagMapping } {
  // const tagMappings: TagMapping = {};
  // let counter = initialCounter;

  // // Regular expression to match any XML/HTML tag and its contents
  // // This regex captures tags and their attributes without being specific to tag names
  // const regex = /<[^>]*?(&lt;.*?&gt;)?[^>]*?>/g; //const regex = /<[^>]+>/g;

  // // Replace function
  // const outputText = inputText.replace(regex, (match) => {
  //   const placeholder = `{{${counter++}}}`;
  //   tagMappings[placeholder] = match;
  //   return placeholder; // Replace the matched tag with the placeholder
  // });

  // return { text: outputText, map: tagMappings };
  const tagMappings: TagMapping = {};
  let counter = initialCounter;

  // Function to process input text and replace tags with placeholders
  function processInputText(inputText: string) {
    let outputText = inputText;
    let match;

    // Pattern to match an opening tag and capture its name
    const startTagPattern = /<(\w+)[^>]*>/g;

    while ((match = startTagPattern.exec(outputText)) !== null) {
      const tagName = match[1];
      const startIndex = match.index;
      const endTagPattern = new RegExp(`<\/${tagName}>`, "g");

      endTagPattern.lastIndex = startTagPattern.lastIndex; // Start searching from the end of the current match

      const endMatch = endTagPattern.exec(outputText);
      if (endMatch) {
        const endIndex = endMatch.index + endMatch[0].length;
        const tagContent = outputText.substring(startIndex, endIndex);
        const placeholder = `${PLACEHOLDER_BRACKETS[0]}${nanoid()}${PLACEHOLDER_BRACKETS[1]}` //`[[${counter++}]]`;
        tagMappings[placeholder] = tagContent;

        // Replace the original tag content with the placeholder in the output text
        outputText =
          outputText.substring(0, startIndex) +
          placeholder +
          outputText.substring(endIndex);

        // Reset lastIndex since the outputText length has changed
        startTagPattern.lastIndex = startIndex + placeholder.length;
      }
    }

    return outputText;
  }

  const processedText = processInputText(inputText);

  return { text: processedText, map: tagMappings };
}

/**
 * Refills the placeholders in the given text with their original XML/HTML tags based on the provided mappings.
 * This function iterates through the mappings object, replacing each placeholder in the text with its original tag content.
 *
 * @param outputText The text containing placeholders to be replaced with original tags.
 * @param mappings An object mapping placeholders to their original XML/HTML tags.
 * @returns {string} The text with all placeholders refilled with their corresponding original tags.
 *
 * @example
 * const outputText = `Mind Tools (2022). {1}SWOT Analysis{2}: {3}Understanding Your Business, Informing Your Strategy. {4}`;
 * const tagMappings: TagMapping = {
 *   "[af29]": `<bpt id="1">&lt;run1></bpt>`,
 *   "[2ed1]": `<ept id="1">&lt;/run1></ept>`,
 *   "[ec31]": `<bpt id="3">&lt;run3></bpt>`,
 *   "[da45]": `<ept id="3">&lt;/run3></ept>`,
 * };
 * const refilledText = refillTextWithOriginalTags(outputText, tagMappings);
 * console.log(refilledText);
 */

export function refillTextWithOriginalTags(
  outputText: string,
  mappings: TagMapping
): string {
  let refilledText = outputText;

  // Iterate through each mapping and replace the placeholder with the original tag
  Object.keys(mappings).forEach((placeholder) => {
    refilledText = refilledText.replace(placeholder, mappings[placeholder]);
  });

  return refilledText;
}
