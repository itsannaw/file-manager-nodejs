import fs from "fs";
import zlib from "zlib";

export function decompressFile(sourcePath, destinationPath) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(sourcePath);
    const brotliStream = zlib.createBrotliDecompress();
    const writeStream = fs.createWriteStream(destinationPath);

    const pipeline = readStream.pipe(brotliStream).pipe(writeStream);

    pipeline.on("error", (error) => {
      reject(error);
    });

    writeStream.on("finish", () => {
      console.log(`File decompressed successfully to: ${destinationPath}`);
      resolve();
    });
  });
}
