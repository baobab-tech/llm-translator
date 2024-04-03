/**
 *
 *  We are not using standard xliff parses because we
 *  want to use our own placeholders for the custom tags in the source content
 *
 */

// type XliffContent = {
//   [key: string]: Array<{ id: string; source: string }>;
// };

export type ParsedXliff = {
  [namespace: string]: Array<{ id: string; source: string; target?: string }>;
};

/**
 * Parses an XLIFF (XML Localization Interchange File Format) string to extract translation units.
 * It specifically looks for the 'original' attribute of the <file> element to use as a key, and
 * collects objects containing 'id' and 'source' text for each <trans-unit> found.
 *
 * This function uses regular expressions to extract the necessary data, which means it is designed
 * to work with well-formed XML strings that follow the basic structure of the provided example. It
 * may not correctly handle all possible XLIFF variations or complexities.
 *
 * @param {string} xliffString - The XLIFF content as a string.
 * @returns {Object} An object where each key corresponds to the 'original' attribute of a <file>
 *                   element, and each value is an array of objects. Each object in the array
 *                   represents a translation unit, with 'id' and 'source' properties containing
 *                   the translation unit's ID and source text, respectively.
 *
 * @example
 * const xliffContent = `<?xml version="1.0" encoding="UTF-8"?>
 * <xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2" xmlns:okp="okapi-framework:xliff-extensions" xmlns:its="http://www.w3.org/2005/11/its" xmlns:itsxlf="http://www.w3.org/ns/its-xliff/" its:version="2.0">
 * <file original="word/document.xml" source-language="en" target-language="sw" datatype="x-undefined" okp:inputEncoding="UTF-8">
 * <body>
 * <trans-unit id="P244D057-tu1" xml:space="preserve">
 * <source xml:lang="en"></source>
 * <target xml:lang="sw"></target>
 * </trans-unit>
 * </body>
 * </file>
 * </xliff>`;
 *
 * const result = parseXLIFFContent(xliffContent);
 * console.log(result);
 * // Output: { "word/document.xml": [ {id: "P244D057-tu1", source: ""} ] }
 */

export function parseXLIFFContent(xliffString: string): ParsedXliff {
  // Extract the 'original' attribute value from the <file> element
  const fileOriginalRegex = /<file\s+original="([^"]+)"/;
  const fileOriginalMatch = xliffString.match(fileOriginalRegex);
  const fileOriginal = fileOriginalMatch ? fileOriginalMatch[1] : "";

  // Prepare to store the results
  const results: ParsedXliff = {};
  results[fileOriginal] = [];

  // Regular expression to find each <trans-unit> block, capturing its 'id' and <source> content
  // This regex accounts for variability in attributes and their order
  const transUnitRegex =
    /<trans-unit\s+id="([^"]+)"[\s\S]*?<source(?:\s+xml:lang="[^"]+")?>([\s\S]*?)<\/source>/g;

  let match: RegExpExecArray | null;
  while ((match = transUnitRegex.exec(xliffString)) !== null) {
    // Push each found trans-unit id and source content into the results
    // but make sure source is not empty else causes issues with any llm translation in batch
    if (match[2].trim())
      results[fileOriginal].push({
        id: match[1],
        source: match[2].trim(),
      });
  }

  return results;
}

/**
 * Replaces the content of <target> elements in the original XLIFF string with new values
 * based on the provided translation units object. It uses a simple replace operation
 * for each translation unit's target value.
 *
 * @param {string} originalXLIFF - The original XLIFF content as a string.
 * @param {Object} translationUnits - An object containing translation units with their new target values.
 *                                    The structure is expected to be the same as the output of `parseXLIFFContent`.
 * @returns {string} The updated XLIFF string with replaced <target> values.
 *
 * @example
 * const originalXLIFF = `<?xml version="1.0" encoding="UTF-8"?>
 * <xliff version="1.2">
 * <file original="word/document.xml">
 * <body>
 * <trans-unit id="P244D057-tu1">
 * <source xml:lang="en">Hello, world!</source>
 * <target xml:lang="sw"></target>
 * </trans-unit>
 * </body>
 * </file>
 * </xliff>`;
 *
 * const translationUnits = {
 *   "word/document.xml": [
 *     { id: "P244D057-tu1", source: "Hello, world!", target: "Habari, dunia!" }
 *   ]
 * };
 *
 * const updatedXLIFF = createXLIFFContent(originalXLIFF, translationUnits);
 * console.log(updatedXLIFF);
 */
export function createXLIFFContent(
  originalXLIFF: string,
  translationUnits: ParsedXliff
): string {
  let updatedXLIFF = originalXLIFF;

  // Iterate over each file original and its translation units
  for (const [fileOriginal, units] of Object.entries(translationUnits)) {
    units.forEach((unit) => {
      // Construct a regex pattern to find the target element corresponding to this unit's id
      const targetRegex = new RegExp(
        `(<trans-unit\\s+id="${unit.id}"[\\s\\S]*?<target(?:\\s+xml:lang="[^"]+")?>)([\\s\\S]*?)(<\/target>)`,
        "g"
      );
      // Replace the content of the target element
      updatedXLIFF = updatedXLIFF.replace(targetRegex, `$1${unit.target}$3`);
    });
  }

  return updatedXLIFF;
}
