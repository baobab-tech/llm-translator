import fs from "fs";
import { createXLIFFContent, parseXLIFFContent } from "./lib/parseXliff";
import { extractPhrases, mergePhrasesBack } from "./lib/extractPhrases";
import { translateBatchXliffPhrases } from "./lib/translateBatchPhrases";
import { DATA_FOLDER } from "./config";

export const translateXliff = async (selectedFile, language) => {
  console.log(`Translating ${selectedFile}`);
  const docString = await fs.promises.readFile(
    `${DATA_FOLDER}/${selectedFile}`,
    "utf-8"
  );
  const obj = await parseXLIFFContent(docString);
  const phrases = await extractPhrases(docString);
  const translatedPhrases = await translateBatchXliffPhrases(phrases, language);
  const newDocString = await createXLIFFContent(
    docString,
    mergePhrasesBack(translatedPhrases, obj)
  );
  await fs.promises.writeFile(
    `${DATA_FOLDER}/${selectedFile}`,
    newDocString,
    "utf-8"
  );
  console.log(
    `${selectedFile} has been translated, back into the same xlf file.`,
    `Location: ${DATA_FOLDER}/${selectedFile}`
  );
};
