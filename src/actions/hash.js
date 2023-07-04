import path from "path";
import fs from "fs";
import crypto from "crypto";
import { currentDirectory } from "../index.js";

export const hash = async (joinedArgs) => {
  try {
    const pathToFile = path.join(currentDirectory, joinedArgs);
    const data = await fs.promises.readFile(pathToFile, "utf8");
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    console.log(hash);
  } catch {
    console.log(`Operation failed`);
  }
};
