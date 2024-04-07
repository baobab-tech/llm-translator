import { runShellCommand } from "./config";
import fs from "fs";

export const generateXliff = async (file, folder, language) => {
  const fileEscaped = file.replace(/[\\/:*?"<>|]/g, "").replace(/ /g, "_");
  await fs.promises.rename(`${folder}/${file}`, `${folder}/${fileEscaped}`);
  const command = `xliff/tikal/tikal.sh -x ${folder}/${fileEscaped} -sl en -tl ${language} -nocopy`;
  console.log(`Running`, command);
  console.log(`Generating XLIFF for ${fileEscaped}`);
  await runShellCommand(command);
  console.log(
    `${fileEscaped} has been generated to XLIFF.`,
    `Location: ${folder}/${fileEscaped}.xlf`
  );
};
