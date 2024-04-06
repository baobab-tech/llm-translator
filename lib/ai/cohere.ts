import { ChatCohere } from "@langchain/cohere";
import { genericLLMCall } from "./generic";

export const cohere = async (data) => {
  const chatModel = new ChatCohere({
    apiKey: process.env.COHERE_API_KEY,
    temperature: data.temperature,
    model: "command-r",
  });
  return genericLLMCall(chatModel, data);
};
