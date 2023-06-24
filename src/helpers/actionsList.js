import path from "path";
import fs from "fs";
import { currentDirectory, setCurrentDirectory } from "../index.js";

export const actionsList = {
  ".exit": () => {
    process.exit(0);
  },
  up: () => {
    const upDirectory = path.join(currentDirectory, "..");
    setCurrentDirectory(upDirectory);
  },
  cd: (joinedArgs) => {
    fs.stat(currentDirectory, (err, stats) => {
      if (err || stats.isFile()) {
        console.log(`Operation failed`);
      } else {
        const selectedDirectory = path.join(currentDirectory, joinedArgs);
        setCurrentDirectory(selectedDirectory);
      }
    });
  },
  ls: async () => {
    const files = await fs.promises.readdir(currentDirectory, {
      withFileTypes: true,
    });
    const fileStats = files.map((file) => {
      return {
        Name: file.name,
        Type: file.isDirectory() ? "directory" : "file",
      };
    });
    // Сортировка по типу (в алфавитном порядке) и по имени (в алфавитном порядке)
    fileStats.sort((a, b) => {
      if (a.Type === b.Type) {
        return a.Name.localeCompare(b.Name); // Сортировка по имени
      } else {
        return a.Type.localeCompare(b.Type); // Сортировка по типу
      }
    });
    console.table(fileStats);
  },
};
