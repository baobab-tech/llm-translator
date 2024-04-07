/**
 * Cost estimator
 */

import fs from "fs";
import { ACCEPTED_FORMATS_EXT, LLM } from "@/xliff/config";
import * as officeParser from "officeParser";
import { PRICING_MAP } from "./llmlist";

export async function costEstimator(filePath: string, prompt: string) {
  try {
    // console.log(filePath, prompt);
    // Parse the document and get the word count
    const docText = await officeParser.parseOfficeAsync(filePath);
    // console.log(docText);
    const wordCount = docText.split(" ").length;

    // Calculate the total word count including the prompt
    const totalWordCount = Math.round(
      (wordCount + prompt.split(" ").length) * 1.05
    );
    const totalTokenCount = totalWordCount * 1.5; // Assuming tokens are 1.5x words

    // console.log(
    //   `The document contains ${wordCount} words and ${totalWordCount} total words.`
    // );

    // Calculate the pricing for input and output
    const pricing = PRICING_MAP[LLM.toLowerCase()];
    if (!pricing) {
      throw new Error(`Could not find pricing for ${LLM}`);
    }
    const inCost = (totalTokenCount / 1_000_000) * pricing.inCostPerMillion;
    const outCost = (totalWordCount / 1_000_000) * pricing.outCostPerMillion;

    // Calculate the total cost, minimum, and maximum
    const totalCost = inCost + outCost;
    const minCost = totalCost * 0.9;
    const maxCost = totalCost * 1.1;

    // Return the notice and price
    return {
      notice: `The processing using ${LLM} will cost between \$${minCost.toFixed(
        4
      )} and \$${maxCost.toFixed(4)}`,
      minCost: minCost,
      maxCost: maxCost,
      cost: totalCost,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Cost estimation failed: ${error}`);
  }
}

export const estimateCostFolder = async (folder: string, prompt: string) => {
  const files = await fs.promises.readdir(folder);
  const filesToProcess = files.filter((file) =>
    ACCEPTED_FORMATS_EXT.some((ext) => file.toLowerCase().endsWith(ext))
  );
  //   console.log("files", filesToProcess);
  let totalMin = 0;
  let total = 0;
  let totalMax = 0;
  let filesList = [];
  for (const file of filesToProcess) {
    const { cost, minCost, maxCost } = await costEstimator(
      `${folder}/${file}`,
      prompt
    );
    total += cost;
    totalMin += minCost;
    totalMax += maxCost;
    filesList.push({ file, cost, minCost, maxCost });
  }
  return { total, totalMin, totalMax, filesList };
};
