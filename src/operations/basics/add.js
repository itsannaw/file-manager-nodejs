import { resolve } from "node:path";
import { writeFile } from "node:fs";

export function createEmptyFile(fileName) {
  const filePath = resolve(process.cwd(), fileName);
  writeFile(filePath, "", (error) => {
    if (error) {
      console.error(
        `Operation failed! An error occurred while creating the file: ${error.message}`
      );
    } else {
      console.log(`Empty file '${fileName}' has been created successfully.`);
    }
  });
}
