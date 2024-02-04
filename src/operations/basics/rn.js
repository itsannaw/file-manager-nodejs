import { resolve, join, dirname } from "node:path";
import { rename } from "node:fs";

export function renameFile(oldPath, newName) {
  const oldFilePath = resolve(oldPath);
  const newFilePath = join(dirname(oldFilePath), newName);

  rename(oldFilePath, newFilePath, (error) => {
    if (error) {
      console.error(
        `An error occurred while renaming the file: ${error.message}`
      );
    } else {
      console.log(`File has been renamed to: ${newFilePath}`);
    }
  });
}
