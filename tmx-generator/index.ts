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
