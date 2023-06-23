import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { currentDirectory } from "../index.js";

export const actionsList = {
  ".exit": () => {
    process.exit(0);
  },
  up: () => {
    console.log("input up");
    const __filename = fileURLToPath(import.meta.url); // путь к текущему файлу
    const __dirname = path.dirname(__filename); // путь к текущей папке
    console.log(__dirname, currentDirectory);
    console.log("up dir", path.join(currentDirectory, ".."));
    const upDirectory = path.join(currentDirectory, "..");
    currentDirectory = upDirectory;
  },
  cd: () => {
    console.log("input cd");
  },
  ls: () => {
    console.log("currentDirectory", currentDirectory);
    fs.readdir(currentDirectory, (err, files) => {
      const fileStats = files.map((file, index) => {
        const filePath = path.join(currentDirectory, file);
        const stats = fs.statSync(filePath);
        return {
          Name: file,
          Type: stats.isDirectory() ? 'directory' : 'file',
        };
      });
      console.table(fileStats);
    });
  },
};
