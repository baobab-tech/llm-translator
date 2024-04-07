import inquirer from "inquirer";

/**
 * Command line interaction for a single file or batch process
 *
 */
export const commandLineSelectLanguage = async (): Promise<{
  // folderOrFile: "file" | "folder";
  language: string;
}> => {
  // const { folderOrFile } = await inquirer.prompt([
  //   {
  //     type: "list",
  //     name: "folderOrFile",
  //     message: "Do you want to process a single file or a folder of files?",
  //     choices: [
  //       { name: "Single File", value: "file" },
  //       { name: "Folder", value: "folder" },
  //     ],
  //   },
  // ]);

  const { language } = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Select a target language:",
      //["en", "fr", "ar", "hi", "ne", "pt"]
      choices: [
        { name: "English", value: "en" },
        { name: "French", value: "fr" },
        { name: "Arabic", value: "ar" },
        { name: "Hindi", value: "hi" },
        { name: "Nepali", value: "ne" },
        { name: "Portuguese", value: "pt" },
        { name: "Swahili", value: "sw" },
      ],
    },
  ]);

  return { language };
};

