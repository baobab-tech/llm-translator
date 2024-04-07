import inquirer from "inquirer";

export const confirmProcess = async () => {
    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `Are you sure you want to process?`,
      },
    ]);
    return confirm;
  };