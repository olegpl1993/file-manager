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
  cd: async (joinedArgs) => {
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
  cat: async (joinedArgs) => {
    const pathToFile = path.join(currentDirectory, joinedArgs); // путь к целевому файлу
    // проверка существования файла
    fs.access(pathToFile, fs.constants.F_OK, (error) => {
      if (error) {
        console.log(`Operation failed`);
      } else {
        // чтение файла и вывод содержимого в консоль
        fs.readFile(pathToFile, "utf8", (err, data) => {
          console.log(data);
        });
      }
    });
  },
};
