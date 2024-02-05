import { resolve, join, basename } from "node:path";
import {
  createReadStream,
  createWriteStream,
  promises as fsPromises,
} from "node:fs";

export async function moveFile(sourcePath, destinationPath) {
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

  try {
    await fsPromises.access(destinationDirPath);
  } catch (error) {
    console.error(
      `Operation failed: destination directory does not exist ${destinationDirPath}`
    );
    return;
  }

  const destinationFilePath = join(
    destinationDirPath,
    basename(sourceFilePath)
  );

  const readStream = createReadStream(sourceFilePath);
  const writeStream = createWriteStream(destinationFilePath);

  readStream.pipe(writeStream);

  readStream.on("error", (error) => {
    console.error(
      `Operation failed: an error occurred while reading the file ${error.message}`
    );
  });

  writeStream.on("error", (error) => {
    console.error(
      `Operation failed: an error occurred while writing the file ${error.message}`
    );
  });

  writeStream.on("finish", async () => {
    console.log(`File moved successfully to ${destinationFilePath}`);
    try {
      await fsPromises.unlink(sourceFilePath);
      console.log(`Source file deleted: ${sourceFilePath}`);
    } catch (error) {
      console.error(
        `Operation failed: an error occurred while deleting the source file ${error.message}`
      );
    }
  });
}
