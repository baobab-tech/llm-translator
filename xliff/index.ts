/**
 *
 *   Has 3 operations using command line interactive:
 *   - Generate XLIFF from .docx, .xlsx, .pptx
 *   - Merge the translaton back into a .docx
 *   - Translate an XLIFF file or original docx etc
 *
 *   And a folder batch process
 *
 */
import { translateXliff } from "./translate";
import { mergeXliff } from "./merge";
import {
  commandLineFolderOrFile,
  commandLineSingleFile,
  confirmProcess,
} from "./commandline";
import { generateXliff } from "./generate";
import { folderBatch } from "./processFolder";
import { DATA_FOLDER, LLM } from "./config";
import { costEstimator, estimateCostFolder } from "@/lib/cost";
import { TranslateXLIFFPhrasePrompt } from "./lib/prompts";

async function main() {
  const { folderOrFile, language } = await commandLineFolderOrFile();

  if (folderOrFile === "folder") {
    /**
     *  Batch process a folder
     */
    console.log(`Batch processing folder ${DATA_FOLDER}`);
    const { total, totalMin, totalMax, filesList } = await estimateCostFolder(
      DATA_FOLDER,
      TranslateXLIFFPhrasePrompt["yes"]
    );
    console.log(
      `Estimated cost using ${LLM}: $${totalMin.toFixed(
        4
      )} - $${totalMax.toFixed(4)} for the ${filesList.length} files`
    );
    const confirm = await confirmProcess();
    if (confirm) await folderBatch(language, DATA_FOLDER);
    else console.log("Process cancelled");
  } else {
    /**
     *  Command line interaction for a single file, step by step
     */

    const { operation, selectedFile } = await commandLineSingleFile();

    if (operation === "generate") {
      /**
       *  Generate XLIFF from .docx, .xlsx, .pptx
       */
      generateXliff(selectedFile, DATA_FOLDER, language);
    } else if (operation === "translate") {
      /**
       * Translate an XLIFF file
       */
      const { notice } = await costEstimator(
        `${DATA_FOLDER}/${selectedFile.replace(".xlf", "")}`,
        TranslateXLIFFPhrasePrompt["yes"]
      );
      console.log(notice);
      const confirm = await confirmProcess();
      if (confirm) await translateXliff(selectedFile, DATA_FOLDER, language);
    } else if (operation === "merge") {
      /**
       *  Merge the translaton back into a .docx...
       */
      mergeXliff(selectedFile, DATA_FOLDER, language);
    }
  }
}

main().catch((error) => console.error(error));
