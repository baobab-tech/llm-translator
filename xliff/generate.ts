import { DATA_FOLDER, runShellCommand } from "./config";

export const generateXliff = async (selectedFile, language) => {
    const command = `xliff/tikal/tikal.sh -x ${DATA_FOLDER}/${selectedFile} -sl en -tl ${language} -nocopy`;
    console.log(`Running`, command);
    console.log(`Generating XLIFF for ${selectedFile}`);
    await runShellCommand(command);
    console.log(
      `${selectedFile} has been generated to XLIFF.`,
      `Location: ${DATA_FOLDER}/${selectedFile}.xlf`
    );
}