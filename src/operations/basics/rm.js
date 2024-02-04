import { unlink } from "node:fs";

export function removeFile(filePath) {
  unlink(filePath, (err) => {
    if (err) {
      console.error("Operation failed: an error occurred while deleting the file", err);
      return;
    }
    console.log(`File ${filePath} has been deleted.`);
  });
}
