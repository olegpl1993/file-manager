import path from "path";
import fs from "fs";
import { currentDirectory } from "../index.js";

export const rn = async (joinedArgs) => {
  try {
    const [arg1, arg2] = joinedArgs.split(" ", 2);
    const pathToFile = path.join(currentDirectory, arg1);
    const pathToRenamedFile = path.join(currentDirectory, arg2);
    await fs.promises.rename(pathToFile, pathToRenamedFile);
  } catch {
    console.log(`Operation failed`);
  }
};
