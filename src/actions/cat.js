import path from "path";
import fs from "fs";
import { currentDirectory } from "../index.js";

export const cat = async (joinedArgs) => {
  try {
    const pathToFile = path.join(currentDirectory, joinedArgs);
    const readStream = fs.createReadStream(pathToFile, "utf8");
    for await (const chunk of readStream) {
      console.log(chunk);
    }
  } catch {
    console.log(`Operation failed`);
  }
};
