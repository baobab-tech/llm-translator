import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import "dotenv/config";
import { parseJSONFromString } from "./parseJson.js";

export const gpt = async <T>({
  prompt,
  sysPrompt,
  temperature = 0.1,
  formatJson,
  tplData = {},
}: {
  prompt: string;
  sysPrompt?: string;
  temperature?: number;
  formatJson?: boolean;
  tplData?: Record<string, string> | {}
}): Promise<T> => {
  try {
    const chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature,
      modelName: "gpt-3.5-turbo",
    });

    let response;

    if (sysPrompt) {
      const chatPrompt = ChatPromptTemplate.fromMessages([["system", sysPrompt], ["user", prompt]]);
      const chain = chatPrompt.pipe(chatModel);
       response = await chain.invoke(tplData);
     
    } else {
      response = await chatModel.invoke(prompt);
    }
    if (formatJson)
      return parseJSONFromString(response.content as string) as T;
    else return response.content as unknown as T;
  } catch (error) {
    console.log({ error });
    return {} as T;
  }
};
