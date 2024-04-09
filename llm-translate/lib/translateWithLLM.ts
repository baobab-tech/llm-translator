/**
 * Translate using LLM
 */

import { escapeCurlys } from "@/lib/ai/utils";
import { LLMTRanslatorFunction } from "@/lib/llmlist";
import { languageMap } from "@/lib/mapper";
import { LLM } from "@/xliff/config";

/**
 *  Translaes text using the provided LLM
 * @param text  the text to translate (will be in <human> prompt)
 * @param language language required if tplData not used
 * @param systemPrompt
 * @param llm  gpt3.5, haiku, sonnet, cmdr, cmdrplus, h2mixtral, mixtral, etc
 * @param tplData values to replace in the prompt in chat mode (ie template {field} variables)
 * @returns
 */
export const translateWithLLM = async ({
  text,
  language,
  systemPrompt = "",
  llm = LLM,
  tplData,
}: {
  text: string;
  language: string;
  systemPrompt?: string;
  llm?: string;
  tplData?: Record<string, string>;
}) => {
  return LLMTRanslatorFunction[llm]<string>({
    prompt: escapeCurlys(text),
    sysPrompt: systemPrompt,
    temperature: 0.3,
    formatJson: false,
    tplData: { ...(tplData || {}), language: languageMap[language] },
  });
};
