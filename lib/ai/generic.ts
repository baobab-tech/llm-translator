import { ChatPromptTemplate } from "@langchain/core/prompts";

import "dotenv/config";
import { parseJSONFromString } from "./parseJson.js";

export const genericLLMCall = async <T>(chatModel, {
  prompt,
  sysPrompt,
  formatJson,
  tplData = {},
}: {
  prompt: string;
  sysPrompt?: string;
  formatJson?: boolean;
  tplData?: Record<string, string> | {}
}): Promise<T> => {
  try {
    
    let response;

    if (sysPrompt) {
      const systemLabel = chatModel.lc_namespace.includes("cohere") ? "ai" : "system";
      const userLabel = chatModel.lc_namespace.includes("cohere") ? "user" : "human";
      const chatPrompt = ChatPromptTemplate.fromMessages([[systemLabel, sysPrompt], [userLabel, prompt]]);
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
