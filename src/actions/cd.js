import path from "path";
import fs from "fs";
import { currentDirectory, setCurrentDirectory } from "../index.js";

export const cd = async (joinedArgs) => {
  try {
    const selectedDirectory = path.join(currentDirectory, joinedArgs);
    const stats = await fs.promises.stat(selectedDirectory);
    if (!stats.isDirectory()) {
      console.log(`Operation failed`);
    } else {
      setCurrentDirectory(selectedDirectory);
    }
  } catch {
    console.log(`Operation failed`);
  }
};
