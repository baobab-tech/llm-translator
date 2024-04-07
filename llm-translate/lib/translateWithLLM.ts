/**
 * Translate using LLM
 */

import { escapeCurlys } from "@/lib/ai/utils";
import { LLMTRanslatorFunction } from "@/lib/llmlist";
import { languageMap } from "@/lib/mapper";
import { LLM } from "@/xliff/config";

/**
 *  Translaes text using the provided LLM
 * @param text 
 * @param language 
 * @param systemPrompt 
 * @param llm  gpt3.5, haiku, sonnet, cmdr, cmdrplus, h2mixtral, mixtral, etc
 * @returns 
 */
export const translateWithLLM = async (text, language, systemPrompt = "", llm = LLM) => {
  return LLMTRanslatorFunction[llm]<string>({
    prompt: escapeCurlys(text),
    sysPrompt: systemPrompt,
    temperature: 0.3,
    formatJson: false,
    tplData: {
      language: languageMap[language],
    },
  });
};
