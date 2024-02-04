import { createReadStream, createWriteStream } from "node:fs";
import zlib from "zlib";

export function compressFile(sourcePath, destinationPath) {
  return new Promise((resolve, reject) => {
    const brotliOptions = {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]:
          zlib.constants.BROTLI_MAX_QUALITY,
      },
    };

    const readStream = createReadStream(sourcePath);
    const brotliStream = zlib.createBrotliCompress(brotliOptions);
    const writeStream = createWriteStream(`${destinationPath}.br`);

    const pipeline = readStream.pipe(brotliStream).pipe(writeStream);

    pipeline.on("error", (error) => {
      reject(error);
    });

    writeStream.on("finish", () => {
      console.log(`File compressed successfully to: ${destinationPath}.br`);
      resolve();
    });
  });
}
