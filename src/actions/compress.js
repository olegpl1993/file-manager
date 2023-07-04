import path from "path";
import fs from "fs";
import zlib from "zlib";
import { currentDirectory } from "../index.js";

export const compress = async (joinedArgs) => {
  try {
    const [fileName, pathToDirectory] = joinedArgs.split(" ", 2);
    const pathToFile = path.join(currentDirectory, fileName);
    const pathToNewFile = path.join(pathToDirectory, fileName + ".br");

    const inputStream = fs.createReadStream(pathToFile);
    const outputStream = fs.createWriteStream(pathToNewFile);
    const brotliStream = zlib.createBrotliCompress();

    inputStream.pipe(brotliStream).pipe(outputStream);
  } catch {
    console.log(`Operation failed`);
  }
};
