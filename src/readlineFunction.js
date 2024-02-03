
import { createInterface } from "node:readline";
import { CURRENT_DIRECTORY, GOODBYE_MESSAGE, WELCOME_MESSAGE } from "./utils/constants.js";
import { processCommands } from "./commands.js";

const currentDirectory = process.cwd();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const readlineFunction = (username) => {
  WELCOME_MESSAGE(username);
  CURRENT_DIRECTORY(currentDirectory);

  rl.on("line", async (input) => {
    if (input.trim() === ".exit") {
      GOODBYE_MESSAGE(username);
      rl.close();
    } else {
      try {
        await processCommands(input);
      } catch (error) {
        console.error("An error occurred while processing the command:", error);
      }
    }
  });

  rl.on("close", () => {
    GOODBYE_MESSAGE(username);
    process.exit(0);
  });

  rl.on("error", (error) => {
    console.error("An error occurred with readline interface:", error);
  });
};
