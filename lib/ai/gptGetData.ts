import { ChatOpenAI } from "@langchain/openai";
// import { ChatPromptTemplate } from "@langchain/core/prompts";

import "dotenv/config";
import { parseJSONFromString } from "./parseJson.js";

export const getDataUsingGPT = async <T>(
  prompt: string,
  isJSONReponse: boolean = true
): Promise<T> => {
  try {
    const chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.1,
      modelName: "gpt-3.5-turbo",
    });

    // const prompt = ChatPromptTemplate.fromMessages([
    //   ["system", "You are a world class technical documentation writer."],
    //   ["user", "{input}"],
    // ]);

    const response = await chatModel.invoke(prompt);
    if (isJSONReponse) return parseJSONFromString(response.content as string) as T;
    else return response.content as unknown as T;
  } catch (error) {
    console.log({ error });
    return {} as T;
  }
};
