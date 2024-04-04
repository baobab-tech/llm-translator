/**
 * Translate using GPT-3.5
 */

import { gpt } from "@/lib/ai/gpt.js";
import { cohere } from "@/lib/ai/cohere.js";
import { fireworks } from "@/lib/ai/fireworks.js";

import { languageMap } from "@/lib/mapper.js";
import { claude } from "@/lib/ai/anthropic";

/**
 * set the function to use (which LLM) 
 */
const LLM = process.env.LLM || "gpt3.5"

const LLMTRanslatorFunction = {
  'gpt3.5': gpt,
  'command-r': cohere,
  'h2mixtral': fireworks('h2mixtral'),
  'mixtral': fireworks('mixtral'),
  'haiku': claude('haiku'),
  'sonnet': claude('sonnet'),
}

export const translateWithLLM = async (text, language, systemPrompt = "") => {
  return LLMTRanslatorFunction[LLM]<string>({
    prompt: text,
    sysPrompt: systemPrompt,
    temperature: 0.3,
    formatJson: false,
    tplData: {
      language: languageMap[language],
    }
  });
};

