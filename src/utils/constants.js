export const WELCOME_MESSAGE = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

export const GOODBYE_MESSAGE = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
};

export const CURRENT_DIRECTORY = (currentDirectory) => {
  console.log(`You are currently in ${currentDirectory}`);
};
