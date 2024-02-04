import { parse } from "path";
import { goUpOneDirectory } from "./operations/nwt/up.js";
import { changeDirectory } from "./operations/nwt/cd.js";
import { listDirectoryContents } from "./operations/nwt/ls.js";
import { catFile } from "./operations/basics/cat.js";
import { createEmptyFile } from "./operations/basics/add.js";
import { renameFile } from "./operations/basics/rn.js";
import { copyFile } from "./operations/basics/cp.js";
import { moveFile } from "./operations/basics/mv.js";
import { removeFile } from "./operations/basics/rm.js";
import { printOSInfo } from "./operations/os/os.js";
import { calculateFileHash } from "./operations/hash/hash.js";
import { compressFile } from "./operations/zip/compress.js";
import { decompressFile } from "./operations/zip/decompress.js";
import {
  CURRENT_DIRECTORY,
  displayAvailableCommands,
} from "./utils/constants.js";

const rootDirectory = parse(process.cwd()).root;
let currentDirectory = process.cwd();

export const setCurrentDirectory = (newDirectory) => {
  currentDirectory = newDirectory;
};

export { currentDirectory };

export const processCommands = async (command) => {
  const [operation, ...args] = command.split(" ");

  try {
    switch (operation.toLowerCase()) {
      case "up":
        let newDirectory = goUpOneDirectory(rootDirectory, currentDirectory);
        if (newDirectory !== currentDirectory) {
          process.chdir(newDirectory);
          currentDirectory = newDirectory;
        }
        break;
      case "cd":
        await changeDirectory(args[0]);
        break;
      case "ls":
        await listDirectoryContents();
        break;
      case "cat":
        catFile(args[0]);
        break;
      case "add":
        createEmptyFile(args[0]);
        break;
      case "rn":
        renameFile(args[0], args[1]);
        break;
      case "cp":
        copyFile(args[0], args[1]);
        break;
      case "mv":
        moveFile(args[0], args[1]);
        break;
      case "rm":
        removeFile(args[0]);
        break;
      case "os":
        printOSInfo(args);
        break;
      case "hash":
        calculateFileHash(args[0]);
        break;
      case "compress":
        compressFile(args[0], args[1]);
        break;
      case "decompress":
        await decompressFile(args[0], args[1]);
        break;
      case "help":
        displayAvailableCommands();
        break;
      default:
        console.error("Invalid input!");
    }
    CURRENT_DIRECTORY(currentDirectory);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
