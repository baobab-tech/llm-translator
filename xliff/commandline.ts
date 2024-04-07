import fs from "fs";
import inquirer from "inquirer";
import { ACCEPTED_FORMATS_EXT, DATA_FOLDER, LLM } from "./config";

/**
 * Command line interaction for a single file, step by step
 * 
 */
export const commandLineSingleFile = async () => {
  const operationChoices = [
    { name: "Generate XLIFF", value: "generate" },
    { name: "Translate XLIFF", value: "translate" },
    { name: "Merge Translation back into Document", value: "merge" },
  ];

  const { operation } = await inquirer.prompt([
    {
      type: "list",
      name: "operation",
      message: "What do you want to do?",
      choices: operationChoices,
    },
  ]);

  if (operation === "translate") {
    console.log(
      `** NOTE: Using ${LLM} as the LLM for translation. Costs will be encured. **`
    );
  }

  const files = await fs.promises.readdir(DATA_FOLDER);
  const allowedExt = operation === "generate" ? ACCEPTED_FORMATS_EXT : [".xlf"];
  const limitedFiles = files.filter((file) =>
    allowedExt.some((x) => file.endsWith(x))
  );

  const fileChoices = limitedFiles.map((file) => ({
    name: file,
    value: file,
  }));
  const { selectedFile } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedFile",
      message: "Select a file:",
      choices: fileChoices,
    },
  ]);

  return { operation, selectedFile };
};

/**
 * Command line interaction for a single file or batch process
 *
 */
export const commandLineFolderOrFile = async (): Promise<{ folderOrFile: 'file' | 'folder'; language: string }> => {

  const { folderOrFile } = await inquirer.prompt([
    {
      type: "list",
      name: "folderOrFile",
      message: "Do you want to process a single file or a folder of files?",
      choices: [
        { name: "Single File", value: "file" },
        { name: "Folder", value: "folder" },
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

  return { folderOrFile, language };
}

export const confirmProcess = async() => {
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: `Are you sure you want to process?`,
    },
  ]);
  return confirm;
}