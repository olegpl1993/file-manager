import path from "path";
import fs from "fs";
import { currentDirectory } from "../index.js";

export const add = async (joinedArgs) => {
  try {
    const pathToFile = path.join(currentDirectory, joinedArgs);
    await fs.promises.writeFile(pathToFile, "", "utf8");
  } catch {
    console.log(`Operation failed`);
  }
};
