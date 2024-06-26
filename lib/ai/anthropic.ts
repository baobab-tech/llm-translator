import { ChatAnthropic } from "@langchain/anthropic";
import { genericLLMCall } from "./generic";

const MODEL_MAP = {
  haiku: "claude-3-haiku-20240307",
  sonnet: "claude-3-sonnet-20240229",
};

type Models = keyof typeof MODEL_MAP;

export const claude =
  (model: Models) =>
  async <T>(data) => {
    if (!MODEL_MAP[model])
      throw new Error(
        `Unknown model ${model}. Make sure it is in CLAUDE_MODEL_MAP`
      );
    const chatModel = new ChatAnthropic({
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
      temperature: data.temperature,
      modelName: MODEL_MAP[model], // "accounts/fireworks/models/nous-hermes-2-mixtral-8x7b-dpo-fp8",
      maxTokens: 1300,
    });
    return genericLLMCall<T>(chatModel, data);
  };
