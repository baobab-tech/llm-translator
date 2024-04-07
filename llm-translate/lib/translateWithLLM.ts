/**
 * Translate using LLM
 */

import { escapeCurlys } from "@/lib/ai/utils";
import { LLMTRanslatorFunction } from "@/lib/llmlist";
import { languageMap } from "@/lib/mapper";
import { LLM } from "@/xliff/config";

export const translateWithLLM = async (text, language, systemPrompt = "") => {
  return LLMTRanslatorFunction[LLM]<string>({
    prompt: escapeCurlys(text),
    sysPrompt: systemPrompt,
    temperature: 0.3,
    formatJson: false,
    tplData: {
      language: languageMap[language],
    },
  });
};
