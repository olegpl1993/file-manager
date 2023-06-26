import fs from "fs";
import { currentDirectory } from "../index.js";

export const ls = async () => {
  try {
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
        return a.Name.localeCompare(b.Name);
      } else {
        return a.Type.localeCompare(b.Type);
      }
    });
    console.table(fileStats);
  } catch {
    console.log(`Operation failed`);
  }
};
