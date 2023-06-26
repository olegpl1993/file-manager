import path from "path";
import fs from "fs";
import zlib from "zlib";
import { currentDirectory } from "../index.js";

export const decompress = async (joinedArgs) => {
  try {
    const [fileName, pathToDirectory] = joinedArgs.split(" ", 2);
    const pathToFile = path.join(currentDirectory, fileName);
    const pathToNewFile = path.join(
      pathToDirectory,
      path.basename(fileName, path.extname(fileName))
    );

    const inputStream = fs.createReadStream(pathToFile);
    const outputStream = fs.createWriteStream(pathToNewFile);
    const brotliStream = zlib.createBrotliDecompress();

    inputStream.pipe(brotliStream).pipe(outputStream);
  } catch {
    console.log(`Operation failed`);
  }
};
