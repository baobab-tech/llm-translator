import fs from "fs";
import { createXLIFFContent, parseXLIFFContent } from "./lib/parseXliff";
import { extractPhrases, mergePhrasesBack } from "./lib/extractPhrases";
import { translateBatchXliffPhrases } from "./lib/translateBatchPhrases";

export const translateXliff = async (file, folder, language) => {
  try {
    console.log(`Translating ${file}`);
    const docString = await fs.promises.readFile(`${folder}/${file}`, "utf-8");
    const obj = await parseXLIFFContent(docString);
    const phrases = await extractPhrases(docString);
    // console.log("XXX",phrases.filter(p => !p.text))
    const translatedPhrases = await translateBatchXliffPhrases(
      phrases,
      language
    );
    const newDocString = await createXLIFFContent(
      docString,
      mergePhrasesBack(translatedPhrases, obj)
    );
    await fs.promises.writeFile(`${folder}/${file}`, newDocString, "utf-8");
    console.log(
      `${file} has been translated, back into the same xlf file.`,
      `Location: ${folder}/${file}`
    );
  } catch (e) {
    console.error(e);
  }
};
