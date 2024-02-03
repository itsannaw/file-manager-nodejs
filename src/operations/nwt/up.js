// up.js
import path from "node:path";
import { CURRENT_DIRECTORY } from "../../utils/constants.js";

export function goUpOneDirectory(rootDirectory, currentDirectory) {
  let parentDir = path.dirname(currentDirectory);

  if (currentDirectory !== rootDirectory && currentDirectory !== parentDir) {
    CURRENT_DIRECTORY(parentDir);
    return parentDir;
  } else {
    console.log("Operation failed: already at the root directory, can't go up.");
    return currentDirectory;
  }
}
