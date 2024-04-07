import fs from "fs";

import { ACCEPTED_FORMATS_EXT } from "./config";
import { generateXliff } from "./generate";
import { translateXliff } from "./translate";
import { mergeXliff } from "./merge";

export const folderBatch = async (language, folder) => {
  const files = await fs.promises.readdir(folder);
  const allowedExt = ACCEPTED_FORMATS_EXT;
  const filesToProcess = files.filter((file) =>
    allowedExt.some((ext) => file.endsWith(ext))
  );

  for (const file of filesToProcess) {
    // escape chars in file 
    let fileEscaped = file.replace(/[\\/:*?"<>|]/g, "").replace(/ /g, "_");
    // rename file
    await fs.promises.rename(`${folder}/${file}`, `${folder}/${fileEscaped}`);
    try {
      await generateXliff(fileEscaped,folder, language); // Assumes generate function returns processed data
      await translateXliff(`${fileEscaped}.xlf`,folder, language); // Assumes translate function returns processed data
      await mergeXliff(`${fileEscaped}.xlf`,folder, language); // Assumes merge function integrates translated data back
      console.log(`Successfully processed ${fileEscaped}`);
    } catch (error) {
      console.error(`Error processing ${fileEscaped}: ${error}`);
    }
  }
};
