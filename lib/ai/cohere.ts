import { ChatCohere } from "@langchain/cohere";
import { genericLLMCall } from "./generic";

const MODEL_MAP = {
  "cmdr": "command-r", // $0.5/$1.5 /M tokens
  "cmdrplus": "command-r-plus", // $3/$15 /M tokens
}

type Models = keyof typeof MODEL_MAP;


export const cohere = (model: Models) => async (data) => {
  const chatModel = new ChatCohere({
    apiKey: process.env.COHERE_API_KEY,
    temperature: data.temperature,
    model: MODEL_MAP[model],
  });
  return genericLLMCall(chatModel, data);
};
