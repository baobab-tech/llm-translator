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
 *
 */
//======================================================

import inquirer from "inquirer";
import { readPairFiles, readSingleFiles } from "./lib/readFiles";
import { processPairs, processSingles } from "./processors";

async function main() {
  const { fileType } = await inquirer.prompt([
    {
      type: "list",
      name: "fileType",
      message: "Select file type:",
      choices: [
        {
          name: "Using a target-language file without a source translation ('singles')",
          value: "Singles",
        },
        {
          name: "Using a source-target translated pair of files ('pairs')",
          value: "Pairs",
        },
      ],
    },
  ]);

  const { language } = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Select a target language:",
      //["en", "fr", "ar", "hi", "ne", "pt"]
      choices: [
        { name: "English", value: "en" },
        { name: "French", value: "fr" },
        { name: "Arabic", value: "ar" },
        { name: "Hindi", value: "hi" },
        { name: "Nepali", value: "ne" },
        { name: "Portuguese", value: "pt" },
        { name: "Swahili", value: "sw" },
      ],
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
    const singleFiles = await readSingleFiles(language);
    const { selectedFiles } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "selectedFiles",
        message: "Select files to process:",
        choices: singleFiles.map((file: any) => ({
          name: file,
          value: file,
        })),
      },
    ]);
    // console.log(selectedFiles);
    await processSingles(selectedFiles, language);
  }

  console.log("Processing completed.");
}

main();
