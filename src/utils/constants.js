export const WELCOME_MESSAGE = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

export const GOODBYE_MESSAGE = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
};

export const CURRENT_DIRECTORY = (currentDirectory) => {
  console.log(`You are currently in ${currentDirectory}`);
};

//commands start
const availableCommands = [
  { command: "up", description: "Move up one directory" },
  { command: "cd path_to_directory", description: "Change directory" },
  { command: "ls", description: "List directory contents" },
  { command: "cat path_to_file", description: "Print file content" },
  { command: "add new_file_name", description: "Create an empty file" },
  { command: "rn path_to_file new_filename", description: "Rename a file" },
  {
    command: "cp path_to_file path_to_new_directory",
    description: "Copy a file",
  },
  {
    command: "mv path_to_file path_to_new_directory",
    description: "Move a file",
  },
  { command: "rm path_to_file", description: "Remove a file" },
  {
    command:
      "os --EOL, os --cpus, os --homedir, os --username, os --architecture",
    description: "Print OS info",
  },
  { command: "hash path_to_file", description: "Calculate file hash" },
  {
    command: "compress path_to_file path_to_destination",
    description: "Compress a file",
  },
  {
    command: "decompress path_to_file path_to_destination",
    description: "Decompress a file",
  },
];

export function displayAvailableCommands() {
  console.log("Available commands:");
  console.table(availableCommands);
}
