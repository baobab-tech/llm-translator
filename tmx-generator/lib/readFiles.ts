import fs from "fs";
/**
 * Pair of files that have source and target
 * named e.g. [name]_en.pdf [name]_fr.pdf
 */
export const PAIRS_DIR =
  process.env.TMX_INPUT_PAIRS_DIR || "tmx-generator/data/input/pairs";
/**
 * Single files of target language
 * to be used with a decent enough target->source LLM translator
 * to generate pair phrases
 *
 */
export const SINGLES_DIR =
  process.env.TMX_INPUT_SINGLES_DIR || "tmx-generator/data/input/singles";

export const OUTPUT_DIR = 
  process.env.TMX_OUTPUT_DIR || "tmx-generator/data/output";



export interface PairFile {
  name: string;
  languages: string[]; // array of languages the file exists in
}

export interface SingleFiles {
  [lang: string]: string[]; // each language has an array of files in that language
}

export async function readPairFiles(
  targetLanguage: string
): Promise<PairFile[]> {
  const files = await fs.promises.readdir(PAIRS_DIR);
  const pairFiles: PairFile[] = [];

  for (const file of files) {
    const [name, lang] = file.split(/_|\.pdf$/);
    const existingPair = pairFiles.find((pair) => pair.name === name);

    if (existingPair) {
      existingPair.languages.push(lang);
    } else {
      pairFiles.push({ name, languages: [lang] });
    }
  }
  // return on only the pairs that have the targetLanguage
  return pairFiles.filter((pair) => pair.languages.includes(targetLanguage));
}

export async function readSingleFiles(lang: string): Promise<string[]> {
  let files = await fs.promises.readdir(SINGLES_DIR);
  files = files.filter((file) => file.endsWith(`_${lang}.pdf`));
  // const singleFiles = [];

  // for (const file of files) {
  //   const [name, lang] = file.split(/_|\.pdf$/);
  //   singleFiles.push(`${name}_${lang}.pdf`);
  // }
  return files;
}
