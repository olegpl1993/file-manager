import path from "path";
import { currentDirectory, setCurrentDirectory } from "../index.js";

export const up = () => {
  try {
    const upDirectory = path.join(currentDirectory, "..");
    setCurrentDirectory(upDirectory);
  } catch {
    console.log(`Operation failed`);
  }
};
