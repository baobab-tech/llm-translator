/**
 *  This script uses command line user interaction to
 *  select file pairs or single files from folders to
 *  generate a TMX.
 *
 *  1) Put pdfs either pairs of translations or target language docs in folder
 *  2) Run the script
 *
 *  > npx tsx index.ts
 *
 *
 */

/**
 * Pair of files that have source and target
 * named e.g. [name]_en.pdf [name]_fr.pdf
 */
const PAIRS_DIR = process.env.TMX_INPUT_PAIRS_DIR || "data/input/pairs";
/**
 * Single files of target language
 * to be used with a decent enough target->source LLM translator
 * to generate pair phrases
 *
 */
const SINGLES_DIR = process.env.TMX_INPUT_SINGLES_DIR || "data/input/singles";
const OUTPUT_DIR = process.env.TMX_OUTPUT_DIR || "data/output";
/**
 * 
 */
//======================================================

import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { PageText, getTextFromPdf } from "@/lib/parsers/pdf/pdfjs.js";
import { getDataUsingGPT } from "@/lib/ai/gptGetData.js";
import { SingleSourceTranslatorPrompt, TranslationPhraseGeneratorPrompt } from "@/lib/prompts.js";
import he from "he";
import { IloveWater } from "@/lib/mapper.js"

interface PairFile {
  name: string;
  languages: string[]; // array of languages the file exists in
}

interface SingleFiles {
  [lang: string]: string[]; // each language has an array of files in that language
}

async function readPairFiles(targetLanguage: string): Promise<PairFile[]> {
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

async function readSingleFiles(): Promise<SingleFiles> {
  const files = await fs.promises.readdir(SINGLES_DIR);
  const singleFiles: SingleFiles = {};

  for (const file of files) {
    const [name, lang] = file.split(/_|\.pdf$/);

    if (!singleFiles[lang]) {
      singleFiles[lang] = [];
    }

    singleFiles[lang].push(`${name}_${lang}.pdf`);
  }

  return singleFiles;
}

async function processPairs(pairFiles: PairFile[], language: string) {
  // console.log(`\nProcessing ${pairFiles.length} pairs...`);
  for (const { name, languages } of pairFiles) {
    if (!languages.includes(language)) {
      console.log(`No ${language} translation found for ${name}, skipping`);
      continue;
    }

    const enPdfText = await getTextFromPdf(`${PAIRS_DIR}/${name}_en.pdf`, { pageByPage: true });
    const targetPdfText = await getTextFromPdf(`${PAIRS_DIR}/${name}_${language}.pdf`, {
      pageByPage: true,
    });

    if (!enPdfText || !targetPdfText) {
      console.error(`Failed to read PDF pair: ${name}`);
      continue;
    }

    const tmxUnits: string[] = [];

    for (let i = 0; i < enPdfText.text.length && i < targetPdfText.text.length; i++) {
      const enPage = (enPdfText.text[i] as PageText).text;
      const targetPage = (targetPdfText.text[i] as PageText).text;

      if (enPage.length < 500 || targetPage.length < 500) {
        console.log(`Skipping short page ${i} pair ${name}`);
        continue;
      }

      // Use GPT to match up the phrases. Count the number of . and : which tells us how many phrases
      const count = enPage.split(".").length + enPage.split(":").length;
      const translationPhrases: any = []; // [['source','target']]
      const sampleTranslation = IloveWater[language];
      let phrasePrompt = TranslationPhraseGeneratorPrompt.replace("{language}", language)
        .replace("{sample}", sampleTranslation)
        .replace("{count}", count.toString());
      phrasePrompt = `${phrasePrompt}<ENGLISH>${enPage}</ENGLISH><TARGET>${targetPage}</TARGET>`;
      const gptExtractedPairString = (await getDataUsingGPT(phrasePrompt, false)) as string;
      gptExtractedPairString.split("\n").map((pair: string) => {
        const [source, target] = pair.split("==");
        console.log(source, target);
        translationPhrases.push([source.trim(), target.trim()]);
      });

      translationPhrases.map((pair) => {
        let [source, target] = pair;
        source = he.escape(source);
        target = he.escape(target);

        tmxUnits.push(
          `<tu><tuv xml:lang="en"><seg>${source}</seg></tuv><tuv xml:lang="${language}"><seg>${target}</seg></tuv></tu>`
        );
      });
    }

    const tmxContent = `<?xml version="1.0" encoding="UTF-8"?>
      <tmx version="1.4b">
        <header creationtool="Custom Script" srclang="en" adminlang="en" datatype="plaintext" o-tmf="tmx" segtype="sentence" creationdate="${new Date().toISOString()}"/>
        <body>
          ${tmxUnits.join("\n")}
        </body>
      </tmx>`;

    await fs.promises.writeFile(`${OUTPUT_DIR}/${name}.tmx`, tmxContent);
  }
}

async function processSingles(singleFiles: SingleFiles, language: string) {
  for (const file of singleFiles[language] || []) {
    const pdfText = await getTextFromPdf<false>(`${SINGLES_DIR}/${file}`, { pageByPage: false });

    if (!pdfText) {
      console.error(`Failed to read PDF: ${file}`);
      continue;
    }

    const translationPrompt = SingleSourceTranslatorPrompt.replace("{language}", language);
    const baseTranslation = await getDataUsingGPT<string>(
      translationPrompt + "\n\n" + pdfText.text,
      false
    );

    const sampleTranslation = IloveWater[language];

    const phrasePrompt = TranslationPhraseGeneratorPrompt.replace("{language}", language).replace(
      "{sample}",
      sampleTranslation
    );

    let tmxUnits: string[] = [];
    const words = pdfText.text.split(/\s+/);

    for (let i = 0; i < words.length; i += 500) {
      const chunk = words.slice(i, i + 500).join(" ");
      const generatedPhrases = await getDataUsingGPT<string>(phrasePrompt + "\n\n" + chunk, false);
      tmxUnits = tmxUnits.concat(generatedPhrases.split("\n"));
    }

    const tmxContent = tmxUnits
      .map((unit) => {
        const [enText, targetText] = unit.split(/<=>/).map((text) => text.trim());
        return `<tu><tuv xml:lang="en"><seg>${enText}</seg></tuv><tuv xml:lang="${language}"><seg>${targetText}</seg></tuv></tu>`;
      })
      .join("\n");

    await fs.promises.writeFile(
      `${SINGLES_DIR}/${path.basename(file, ".pdf")}_${language}.txt`,
      baseTranslation
    );
    await fs.promises.writeFile(`${SINGLES_DIR}/${path.basename(file, ".pdf")}.tmx`, tmxContent);
  }
}

async function main() {
  const { fileType } = await inquirer.prompt([
    {
      type: "list",
      name: "fileType",
      message: "Select file type:",
      choices: ["Pairs", "Singles"],
    },
  ]);

  const { language } = await inquirer.prompt([
    {
      type: "input",
      name: "language",
      message: "Enter target language code:",
    },
  ]);

  if (fileType === "Pairs") {
    const pairFiles = await readPairFiles(language);
    const { selectedFiles } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "selectedFiles",
        message: "Select files to process:",
        choices: pairFiles.map((file) => ({
          name: file.name,
          value: file,
        })),
      },
    ]);

    await processPairs(selectedFiles, language);
  } else {
    const singleFiles = await readSingleFiles();
    const { selectedFiles } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "selectedFiles",
        message: "Select files to process:",
        choices: Object.entries(singleFiles).map(([lang, files]) => ({
          name: `${lang} (${files.length} files)`,
          value: lang,
        })),
      },
    ]);

    for (const lang of selectedFiles) {
      await processSingles(singleFiles, lang);
    }
  }

  console.log("Processing completed.");
}

main();
