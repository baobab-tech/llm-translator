import { exec } from "child_process";

export const ACCEPTED_FORMATS_EXT = [".docx", ".xlsx", ".pptx", ".html"];
export const DATA_FOLDER = process.env.XLIFF_DATA_FOLDER || "xliff/data";
export const LLM = process.env.LLM || "gpt3.5";
export const SUFFIX = process.env.XLIFF_SUFFIX || `__llm_${LLM.replace(".","")}`; // for the translated file post merge


export const runShellCommand = (command) => {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return reject(error);
        }
        console.log(`stdout: ${stdout}`);
        if(stderr)
        console.error(`stderr: ${stderr}`);
        resolve(stdout);
      });
    });
  };
