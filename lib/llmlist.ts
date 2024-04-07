import { gpt } from "@/lib/ai/gpt";
import { cohere } from "@/lib/ai/cohere";
import { fireworks } from "@/lib/ai/fireworks";

import { claude } from "@/lib/ai/anthropic";

interface Pricing {
  inCostPerMillion: number;
  outCostPerMillion: number;
}

export const PRICING_MAP: Record<LLMName, Pricing> = {
  cmdr: { inCostPerMillion: 0.5, outCostPerMillion: 1.5 },
  cmdrplus: { inCostPerMillion: 3, outCostPerMillion: 15 },
  mixtral: { inCostPerMillion: 0.3, outCostPerMillion: 0.3 },
  h2mixtral: { inCostPerMillion: 0.3, outCostPerMillion: 0.3 },
  haiku: { inCostPerMillion: 0.5, outCostPerMillion: 1.5 },
  sonnet: { inCostPerMillion: 3, outCostPerMillion: 15 },
  "gpt3.5": { inCostPerMillion: 0.5, outCostPerMillion: 1.5 },
};

export const LLMTRanslatorFunction = {
  "gpt3.5": gpt,
  cmdr: cohere("cmdr"),
  cmdrplus: cohere("cmdrplus"),
  h2mixtral: fireworks("h2mixtral"),
  mixtral: fireworks("mixtral"),
  haiku: claude("haiku"),
  sonnet: claude("sonnet"),
};

export type LLMName = keyof typeof LLMTRanslatorFunction;
