import fs from "fs";

import { PAIRS_DIR, PairFile, SINGLES_DIR, SingleFiles } from "./lib/readFiles";
import { PageText, getTextFromPdf } from "@/lib/parsers/pdf/pdfjs";
import {
  SingleSourceTranslatorPrompt,
  TranslationPhraseGeneratorPrompt,
} from "./lib/prompts";
import { IloveWater } from "@/lib/mapper";
import { TUType, createTmxContentString } from "./lib/createTmxString";
import { gpt } from "@/lib/ai/gpt";
import path from "path";
// import inquirer from "inquirer";
import he from "he";

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

export async function processSingles(singleFiles: SingleFiles, language: string) {
  for (const file of singleFiles[language] || []) {
    const pdfText = await getTextFromPdf<false>(`${SINGLES_DIR}/${file}`, {
      pageByPage: false,
    });

    if (!pdfText) {
      console.error(`Failed to read PDF: ${file}`);
      continue;
    }

    const translationPrompt = SingleSourceTranslatorPrompt.replace(
      "{language}",
      language
    );
    const baseTranslation = await gpt<string>({
      prompt: translationPrompt + "\n\n" + pdfText.text,
      formatJson: false,
    });

    const sampleTranslation = IloveWater[language];

    const phrasePrompt = TranslationPhraseGeneratorPrompt.replace(
      "{language}",
      language
    ).replace("{sample}", sampleTranslation);

    let tmxUnits: string[] = [];
    const words = pdfText.text.split(/\s+/);

    for (let i = 0; i < words.length; i += 500) {
      const chunk = words.slice(i, i + 500).join(" ");
      const generatedPhrases = await gpt<string>({
        prompt: phrasePrompt + "\n\n" + chunk,
        formatJson: false,
      });
      tmxUnits = tmxUnits.concat(generatedPhrases.split("\n"));
    }

    const tmxContent = tmxUnits
      .map((unit) => {
        const [enText, targetText] = unit
          .split(/<=>/)
          .map((text) => text.trim());
        return `<tu><tuv xml:lang="en"><seg>${enText}</seg></tuv><tuv xml:lang="${language}"><seg>${targetText}</seg></tuv></tu>`;
      })
      .join("\n");

    await fs.promises.writeFile(
      `${SINGLES_DIR}/${path.basename(file, ".pdf")}_${language}.txt`,
      baseTranslation
    );
    await fs.promises.writeFile(
      `${SINGLES_DIR}/${path.basename(file, ".pdf")}.tmx`,
      tmxContent
    );
  }
}
