import { resolve, join, basename } from "node:path";
import {
  createReadStream,
  createWriteStream,
  promises as fsPromises,
} from "node:fs";

export async function copyFile(sourcePath, destinationPath) {
  const sourceFilePath = resolve(sourcePath);
  const destinationDirPath = resolve(destinationPath);

  try {
    await fsPromises.access(sourceFilePath);
  } catch (error) {
    console.error(
      `Operation failed: source file does not exist ${sourceFilePath}`
    );
    return;
  }

  const destinationFilePath = join(
    destinationDirPath,
    basename(sourceFilePath)
  );

  try {
    await fsPromises.access(destinationDirPath);
  } catch (error) {
    console.error(
      `Operation failed: ${destinationDirPath}`
    );
    return;
  }

  const readStream = createReadStream(sourceFilePath);
  const writeStream = createWriteStream(destinationFilePath);

  readStream.pipe(writeStream);

  readStream.on("error", (error) => {
    console.error(
      `Operation failed: ${error.message}`
    );
  });

  writeStream.on("error", (error) => {
    console.error(
      `Operation failed: ${error.message}`
    );
  });

  writeStream.on("finish", () => {
    console.log(`File copied successfully to: ${destinationFilePath}`);
  });
}
