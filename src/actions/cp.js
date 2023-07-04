import path from "path";
import fs from "fs";
import { currentDirectory } from "../index.js";

export const cp = async (joinedArgs) => {
  try {
    const [fileName, pathToDirectory] = joinedArgs.split(" ", 2);
    const pathToFile = path.join(currentDirectory, fileName);
    const pathToNewFile = path.join(pathToDirectory, fileName);
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(pathToNewFile);
    readStream.pipe(writeStream);
  } catch {
    console.log(`Operation failed`);
  }
};
