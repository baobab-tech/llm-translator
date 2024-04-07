import { SUFFIX, runShellCommand } from "./config";
import fs from "fs";
import { generateTmxFromXliff } from "@/tmx-generator/lib/createTmxFromXliff";

export const mergeXliff = async (selectedFile, folder, language) => {
  const command = `xliff/tikal/tikal.sh -m ${folder}/${selectedFile} -sl en -tl ${language}`;
  console.log(`Running`, command);
  console.log(`Generating XLIFF for ${selectedFile}`);
  await runShellCommand(command);
  // rename the output with the SUFFIX (note tikal makes it .out.docx from selectedFile which ends in .docx.xlf
  // remove the .xlf from the end of the file name (remove last 4 chars)
  const selectedFileOriginal = selectedFile.slice(0, -4);
  const selectedFileExt = selectedFileOriginal.split(".").pop(); // now its name.docx
  const ouputFileName = selectedFileOriginal.replace(
    selectedFileExt,
    `out.${selectedFileExt}`
  );
  const newFileName = selectedFileOriginal.replace(
    `.${selectedFileExt}`,
    `${SUFFIX}_${language}.${selectedFileExt}`
  );
  // make sure there is an out folder in DATA_folder
  if (!fs.existsSync(`${folder}/out`)) {
    fs.mkdirSync(`${folder}/out`);
  }
  const outPath = `${folder}/out/${newFileName}`;
  await fs.promises.rename(`${folder}/${ouputFileName}`, outPath);
  console.log(
    `\n\n${selectedFile} has been generated to XLIFF.`,
    `Location: ${outPath}\n\n`
  );

  // now save xlf pairs for potential future tmx into a folder /{lang}
  const tmxPath = `${folder}/${language}`;
  if (!fs.existsSync(tmxPath)) {
    fs.mkdirSync(tmxPath);
  }
  const tmxPathFile = `${tmxPath}/${newFileName}.tmx`;
  // read the xlif file
  const xliffContent = await fs.readFileSync(
    `${folder}/${selectedFile}`,
    "utf8"
  );
  // create tmx
  const tmxString = generateTmxFromXliff(xliffContent);
  // write to file
  await fs.promises.writeFile(tmxPathFile, tmxString);
};
