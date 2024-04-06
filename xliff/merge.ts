import { DATA_FOLDER, SUFFIX, runShellCommand } from "./config";
import fs from "fs";

export const mergeXliff = async (selectedFile, language) => {
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