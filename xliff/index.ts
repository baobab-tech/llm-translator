/**
 *
 *   Has 3 operations using command line interactive:
 *   - Generate XLIFF from .docx, .xlsx, .pptx
 *   - Merge the translaton back into a .docx
 *   - Translate an XLIFF file or original docx etc
 */
import { translateXliff } from "./translate";
import { mergeXliff } from "./merge";
import { commandLine } from "./commandline";

async function main() {
  const { operation, language, selectedFile } = await commandLine();

  if (operation === "generate") {
    /**
     *  Generate XLIFF from .docx, .xlsx, .pptx
     */
  } else if (operation === "translate") {
    /**
     * Translate an XLIFF file
     */
    translateXliff(selectedFile, language);
  } else if (operation === "merge") {
    /**
     *  Merge the translaton back into a .docx...
     */
    mergeXliff(selectedFile, language);
  }
}

main().catch((error) => console.error(error));
