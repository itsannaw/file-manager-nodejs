import path from "node:path";
import fs from "node:fs/promises";

export async function listDirectoryContents() {
  try {
    const currentDirectory = process.cwd();
    let directoryContents = await fs.readdir(currentDirectory);

    const contents = [];

    await Promise.all(
      directoryContents.map(async (content) => {
        const fullPath = path.join(currentDirectory, content);
        const stats = await fs.stat(fullPath);
        const type = stats.isDirectory() ? "directory" : "file";
        contents.push({
          Name: content,
          Type: type,
        });
      })
    );
    contents.sort((a, b) => {
      if (a.Type !== b.Type) {
        return a.Type === "directory" ? -1 : 1;
      }
      return a.Name.localeCompare(b.Name);
    });

    console.table(contents);
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}
