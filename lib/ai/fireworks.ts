import { ChatFireworks } from "@langchain/community/chat_models/fireworks";
import { genericLLMCall } from "./generic";

const FW_MODEL_MAP = {
    "h2mixtral": "accounts/fireworks/models/nous-hermes-2-mixtral-8x7b-dpo-fp8",
    "mixtral": "accounts/fireworks/models/mixtral-8x7b-instruct",
}

export const fireworks = (model: string) => async <T>(data) => {
  if(!FW_MODEL_MAP[model]) throw new Error(`Unknown model ${model}. Make sure it is in FW_MODEL_MAP`);
  const chatModel = new ChatFireworks({
    fireworksApiKey: process.env.FIREWORKS_API_KEY,
    temperature: data.temperature,
    modelName: FW_MODEL_MAP[model], // "accounts/fireworks/models/nous-hermes-2-mixtral-8x7b-dpo-fp8",
    maxTokens: 1300
  });
  return genericLLMCall<T>(chatModel, data);
};
