import fs from "fs";

import {
  PAIRS_DIR,
  PairFile,
  SINGLES_DIR,
  OUTPUT_DIR,
  SingleFiles,
} from "./lib/readFiles";
import { PageText, getTextFromPdf } from "@/lib/parsers/pdf/pdfjs";
import { TranslationPhraseGeneratorPrompt } from "./lib/prompts";
import { IloveWater, languageMap } from "@/lib/mapper";
import { TUType, createTmxContentString } from "./lib/createTmxString";
import { gpt } from "@/lib/ai/gpt";
// import inquirer from "inquirer";
import he from "he";
import { translateWithLLM } from "@/llm-translate/lib/translateWithLLM";

//==============================
const CHUNK_LENGTH_WORDS = 500;
const PREFERRED_LLM = {
  fr: "gpt3.5",
  ar: "haiku",
  es: "gpt3.5",
};
//==============================

export async function processPairs(pairFiles: PairFile[], language: string) {
  console.log(`Processing ${pairFiles.length} pairs...`);
  for (const { name, languages } of pairFiles) {
    if (!languages.includes(language)) {
      console.log(`No ${language} translation found for ${name}, skipping`);
      continue;
    }
    console.log(`Processing ${name}... for ${language}`);

    // if the tmx with the same name exists then warn and skip
    const tmxPath = `${OUTPUT_DIR}/${name}.tmx`;
    if (await fs.existsSync(tmxPath)) {
      console.log(`TMX for ${name} already exists`);
      //   const { override } = await inquirer.prompt([
      //     {
      //       type: "confirm",
      //       name: "override",
      //       message: `Override existing TMX?`,
      //       default: false,
      //     },
      //   ]);
      //   continue;
    }

    const enPdfText = await getTextFromPdf(`${PAIRS_DIR}/${name}_en.pdf`, {
      pageByPage: true,
    });
    const targetPdfText = await getTextFromPdf(
      `${PAIRS_DIR}/${name}_${language}.pdf`,
      {
        pageByPage: true,
      }
    );

    if (!enPdfText || !targetPdfText) {
      console.error(`Failed to read PDF pair: ${name}`);
      continue;
    }

    const tmxUnits: TUType[] = [];

    for (
      let i = 0;
      i < enPdfText.text.length && i < targetPdfText.text.length;
      i++
    ) {
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
      let phrasePrompt = TranslationPhraseGeneratorPrompt.replace(
        "{language}",
        language
      )
        .replace("{sample}", sampleTranslation)
        .replace("{count}", count.toString());
      phrasePrompt = `${phrasePrompt}<ENGLISH>${enPage}</ENGLISH><TARGET>${targetPage}</TARGET>`;

      console.log("Sending to LLM for phrase matching...");

      const gptExtractedPairString = (await gpt({
        prompt: phrasePrompt,
        formatJson: false,
      })) as string;
      gptExtractedPairString.split("\n").map((pair: string) => {
        const [source, target] = pair.split("==");
        console.log(source, target);
        translationPhrases.push([source.trim(), target.trim()]);
      });

      translationPhrases.map((pair) => {
        let [source, target] = pair;
        source = he.escape(source);
        target = he.escape(target);

        tmxUnits.push({ language, source, target });
      });
    }

    const tmxContent = createTmxContentString({ tmxUnits });

    await fs.promises.writeFile(`${OUTPUT_DIR}/${name}.tmx`, tmxContent);
  }
}

export async function processSingles(singleFiles: string[], language: string) {
  for (const fileIdx in singleFiles) {
    const file = singleFiles[fileIdx];
    const pdfText = await getTextFromPdf<false>(`${SINGLES_DIR}/${file}`, {
      pageByPage: false,
    });

    if (!pdfText) {
      console.error(`Failed to read PDF: ${file}`);
      continue;
    }

    const sampleTranslation = IloveWater[language];

    const tmxUnits: { source: string; target: string }[] = [];
    const words = pdfText.text.split(/\s+/);

    console.log(
      `Processing ${file}... Generating English => ${languageMap[language]} TMX and CSV files using LLM: ${PREFERRED_LLM[language]}`
    );

    for (let i = 0; i < words.length; i += CHUNK_LENGTH_WORDS) {
      const chunk = words.slice(i, i + CHUNK_LENGTH_WORDS).join(" ");
      const generatedPhrases = await translateWithLLM({
        text: chunk,
        language,
        systemPrompt: TranslationPhraseGeneratorPrompt,
        llm: PREFERRED_LLM[language],
        tplData: {
          count: (CHUNK_LENGTH_WORDS / 15).toFixed(0),
          sample: sampleTranslation,
        },
      });
      generatedPhrases.split("\n").map((pair) => {
        if (pair.includes("===")) {
          const [source, target] = pair.split("===");
          tmxUnits.push({ source, target });
        }
      });
    }

    const tmxContent = `<?xml version="1.0" encoding="UTF-8"?>
    <tmx version="1.4b">
      <header creationtool="Custom Script" srclang="en" adminlang="en" datatype="plaintext" o-tmf="tmx" segtype="sentence" creationdate="${new Date().toISOString()}"/>
      <body>
        ${tmxUnits
          .map(
            (pair) =>
              `<tu><tuv xml:lang="en"><seg>${pair.source.trim()}</seg></tuv><tuv xml:lang="${language}"><seg>${pair.target.trim()}</seg></tuv></tu>`
          )
          .join("\n")}
      </body>
    </tmx>`;

    await fs.writeFileSync(
      `${OUTPUT_DIR}/${file}_${PREFERRED_LLM[language]}_${language}.tmx`,
      tmxContent
    );

    const csvContent = tmxUnits
      .map((pair) => `${pair.source.trim()};${pair.target.trim()}`)
      .join("\n");

    await fs.writeFileSync(
      `${OUTPUT_DIR}/${file}_${PREFERRED_LLM[language]}_${language}.csv`,
      csvContent
    );

    // await fs.promises.writeFile(
    //   `${SINGLES_DIR}/${file}_${PREFERRED_LLM[language]}_${language}.txt`,
    //   baseTranslation
    // );
  }
}
