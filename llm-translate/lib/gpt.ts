/**
 * Translate using GPT-3.5
 */

import { gpt } from "@/lib/ai/gpt";
import { languageMap } from "@/lib/mapper";

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
