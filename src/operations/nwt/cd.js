import path from "node:path";
import fs from "node:fs/promises";

export async function changeDirectory(targetPath) {
  try {
    const resolvedPath = path.resolve(targetPath);
    await fs.access(resolvedPath);
    process.chdir(resolvedPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(
        `Operation failed: directory '${targetPath}' does not exist.`
      );
    } else {
      console.error(`An error occurred: ${error.message}`);
    }
  }
}
