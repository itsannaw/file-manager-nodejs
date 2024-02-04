import fs from "fs";
import crypto from "crypto";

export function calculateFileHash(filePath, algorithm = "sha256") {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm);
    const stream = fs.createReadStream(filePath);

    stream.on("data", (data) => {
      hash.update(data);
    });

    stream.on("end", () => {
      const fileHash = hash.digest("hex");
      resolve(fileHash);
      console.log(`The hash of ${filePath} is: ${fileHash}`);
    });

    stream.on("error", (error) => {
      reject(error);
      console.error("Operation failed: invalid hash operation");
    });
  });
}
