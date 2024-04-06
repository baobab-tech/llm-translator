import { ChatOpenAI } from "@langchain/openai";
import { genericLLMCall } from "./generic";

export const gpt = async <T>(data) => {
  const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: data.temperature,
    modelName: "gpt-3.5-turbo",
  });
  return genericLLMCall<T>(chatModel, data);
};
