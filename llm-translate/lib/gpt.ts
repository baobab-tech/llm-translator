/**
 * Translate using GPT-3.5
 */

import { gpt } from "@/lib/ai/gpt.js";
import { languageMap } from "@/lib/mapper.js";

export const translateWithGPT = async (text, language, systemPrompt = "") => {
  return gpt<string>({
    prompt: text,
    sysPrompt: systemPrompt,
    temperature: 0.1,
    formatJson: false,
    tplData: {
      language: languageMap[language],
    }
  });
};
