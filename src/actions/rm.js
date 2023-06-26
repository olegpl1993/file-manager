import path from "path";
import fs from "fs";
import { currentDirectory } from "../index.js";

export const rm = async (joinedArgs) => {
  try {
    const pathToFile = path.join(currentDirectory, joinedArgs);
    await fs.promises.unlink(pathToFile);
  } catch {
    console.log(`Operation failed`);
  }
};
