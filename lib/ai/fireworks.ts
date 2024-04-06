import { ChatFireworks } from "@langchain/community/chat_models/fireworks";
import { genericLLMCall } from "./generic";

const MODEL_MAP = {
    "h2mixtral": "accounts/fireworks/models/nous-hermes-2-mixtral-8x7b-dpo-fp8", // $0.5/$0.5 / M tokens
    "mixtral": "accounts/fireworks/models/mixtral-8x7b-instruct", // $0.5/$0.5 / M tokens
}

type Models = keyof typeof MODEL_MAP;

export const fireworks = (model:Models) => async <T>(data) => {
  if(!MODEL_MAP[model]) throw new Error(`Unknown model ${model}. Make sure it is in FW_MODEL_MAP`);
  const chatModel = new ChatFireworks({
    fireworksApiKey: process.env.FIREWORKS_API_KEY,
    temperature: data.temperature,
    modelName: MODEL_MAP[model], // "accounts/fireworks/models/nous-hermes-2-mixtral-8x7b-dpo-fp8",
    maxTokens: 1300
  });
  return genericLLMCall<T>(chatModel, data);
};
