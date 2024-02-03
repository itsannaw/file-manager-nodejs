import path from "node:path";
import fs from 'node:fs/promises';
import { CURRENT_DIRECTORY } from "../../utils/constants.js";

export async function changeDirectory(targetPath) {
  try {
    const resolvedPath = path.resolve(targetPath);
    await fs.access(resolvedPath);
    process.chdir(resolvedPath);
    CURRENT_DIRECTORY(process.cwd());
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`Directory '${targetPath}' does not exist.`);
    } else if (error.code === 'EACCES') {
      console.error(`Permission denied to access '${targetPath}'.`);
    } else {
      console.error(`An error occurred: ${error.message}`);
    }
  }
}