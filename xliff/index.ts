/**
 *
 *   Has 3 operations using command line interactive:
 *   - Generate XLIFF from .docx, .xlsx, .pptx
 *   - Merge the translaton back into a .docx
 *   - Translate an XLIFF file or original docx etc
 */
import fs from "fs";
import inquirer from "inquirer";
import { exec } from "child_process";
import _ from "lodash";
import { parseXLIFFContent, createXLIFFContent } from "./lib/parseXliff.js";
import { extractPhrases, mergePhrasesBack } from "./lib/extractPhrases.js";
import { translateBatchXliffPhrases } from "./lib/translateBatchPhrases.js";

const DATA_FOLDER = process.env.XLIFF_DATA_FOLDER || "xliff/data";
const SUFFIX = process.env.XLIFF_SUFFIX || "__llm_gpt3"; // for the translated file post merge


const ACCEPTED_FORMATS_EXT = [".docx", ".xlsx", ".pptx", ".html"];

const runShellCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject(error);
      }
      console.log(`stdout: ${stdout}`);
      if(stderr)
      console.error(`stderr: ${stderr}`);
      resolve(stdout);
    });
  });
};

async function main() {
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

  if (operation === "generate") {
    const command = `xliff/tikal/tikal.sh -x ${DATA_FOLDER}/${selectedFile} -sl en -tl ${language} -nocopy`;
    console.log(`Running`, command);
    console.log(`Generating XLIFF for ${selectedFile}`);
    await runShellCommand(command);
    console.log(
      `${selectedFile} has been generated to XLIFF.`,
      `Location: ${DATA_FOLDER}/${selectedFile}.xlf`
    );
  } else if (operation === "translate") {
    console.log(`Translating ${selectedFile}`);
    const docString = await fs.promises.readFile(
      `${DATA_FOLDER}/${selectedFile}`,
      "utf-8"
    );
    const obj = await parseXLIFFContent(docString);
    const phrases = await extractPhrases(docString);
    const translatedPhrases = await translateBatchXliffPhrases(
      phrases,
      language
    );
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
  } else if (operation === "merge") {
    
    const command = `xliff/tikal/tikal.sh -m ${DATA_FOLDER}/${selectedFile} -sl en -tl ${language}`;
    console.log(`Running`, command);
    console.log(`Generating XLIFF for ${selectedFile}`);
    await runShellCommand(command);
    // rename the output with the SUFFIX (note tikal makes it .out.docx from selectedFile which ends in .docx.xlf
    // remove the .xlf from the end of the file name (remove last 4 chars)
    const selectedFileOriginal = selectedFile.slice(0, -4);
    const selectedFileExt = selectedFileOriginal.split(".").pop(); // now its name.docx
    const ouputFileName = selectedFileOriginal.replace(selectedFileExt,`out.${selectedFileExt}`);
    const newFileName = selectedFileOriginal.replace(`.${selectedFileExt}`,`${SUFFIX}_${language}.${selectedFileExt}`);
    await fs.promises.rename(
      `${DATA_FOLDER}/${ouputFileName}`,
      `${DATA_FOLDER}/${newFileName}`
    );
    console.log(
      `\n\n${selectedFile} has been generated to XLIFF.`,
      `Location: ${DATA_FOLDER}/${newFileName}`
    );
  }
}

main().catch((error) => console.error(error));
