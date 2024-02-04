import { createReadStream } from "node:fs";
import { resolve } from "node:path";

export function catFile(filePath) {
  const resolvedPath = resolve(filePath);
  const readStream = createReadStream(resolvedPath, { encoding: "utf8" });

  readStream.on("error", (error) => {
    console.error(`Operation failed: an error occurred while reading the file: ${error.message}`);
  });

  readStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  readStream.on("end", () => {
    console.log("\n--- End of file content ---");
  });
}
