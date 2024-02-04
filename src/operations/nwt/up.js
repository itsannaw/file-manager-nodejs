import path from "node:path";

export function goUpOneDirectory(rootDirectory, currentDirectory) {
  let parentDir = path.dirname(currentDirectory);

  if (currentDirectory !== rootDirectory && currentDirectory !== parentDir) {
    return parentDir;
  } else {
    console.log(
      "Operation failed: already at the root directory, can't go up."
    );
    return currentDirectory;
  }
}
