import { runShellCommand } from "./config";

export const generateXliff = async (file,folder, language) => {
    const command = `xliff/tikal/tikal.sh -x ${folder}/${file} -sl en -tl ${language} -nocopy`;
    console.log(`Running`, command);
    console.log(`Generating XLIFF for ${file}`);
    await runShellCommand(command);
    console.log(
      `${file} has been generated to XLIFF.`,
      `Location: ${folder}/${file}.xlf`
    );
}