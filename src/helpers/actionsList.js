import path from "path";
import fs from "fs";
import os from "os";
import { currentDirectory, setCurrentDirectory } from "../index.js";

export const actionsList = {
  ".exit": () => {
    process.exit(0);
  },
  up: () => {
    try {
      const upDirectory = path.join(currentDirectory, "..");
      setCurrentDirectory(upDirectory);
    } catch {
      console.log(`Operation failed`);
    }
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
          return a.Name.localeCompare(b.Name); // Сортировка по имени
        } else {
          return a.Type.localeCompare(b.Type); // Сортировка по типу
        }
      });
      console.table(fileStats);
    } catch {
      console.log(`Operation failed`);
    }
  },
  cat: async (joinedArgs) => {
    try {
      const pathToFile = path.join(currentDirectory, joinedArgs);
      const data = await fs.promises.readFile(pathToFile, "utf8");
      console.log(data);
    } catch {
      console.log(`Operation failed`);
    }
  },
  add: async (joinedArgs) => {
    try {
      const pathToFile = path.join(currentDirectory, joinedArgs);
      await fs.promises.writeFile(pathToFile, "", "utf8");
    } catch {
      console.log(`Operation failed`);
    }
  },
  rn: async (joinedArgs) => {
    try {
      const [arg1, arg2] = joinedArgs.split(" ", 2);
      const pathToFile = path.join(currentDirectory, arg1);
      const pathToRenamedFile = path.join(currentDirectory, arg2);
      await fs.promises.rename(pathToFile, pathToRenamedFile);
    } catch {
      console.log(`Operation failed`);
    }
  },
  cp: async (joinedArgs) => {
    try {
      const [fileName, pathToDirectory] = joinedArgs.split(" ", 2);
      const pathToFile = path.join(currentDirectory, fileName);
      const pathToNewFile = path.join(pathToDirectory, fileName);
      await fs.promises.copyFile(pathToFile, pathToNewFile);
    } catch {
      console.log(`Operation failed`);
    }
  },
  mv: async (joinedArgs) => {
    try {
      const [fileName, pathToDirectory] = joinedArgs.split(" ", 2);
      const pathToFile = path.join(currentDirectory, fileName);
      const pathToNewFile = path.join(pathToDirectory, fileName);
      await fs.promises.copyFile(pathToFile, pathToNewFile);
      await fs.promises.unlink(pathToFile);
    } catch {
      console.log(`Operation failed`);
    }
  },
  rm: async (joinedArgs) => {
    try {
      const pathToFile = path.join(currentDirectory, joinedArgs);
      await fs.promises.unlink(pathToFile);
    } catch {
      console.log(`Operation failed`);
    }
  },
  os: async (joinedArgs) => {
    try {
      const args = joinedArgs.split(" ");
      if (args.includes("--EOL")) {
        const eol = os.EOL;
        console.log("eol: ", eol);
      }
      if (args.includes("--cpus")) {
        const cpus = os.cpus();
        cpus.forEach((cpu, index) => {
          const { model, speed } = cpu;
          console.log(`CPU ${index + 1}: ${model} - ${speed / 1000} GHz`);
        });
      }
    } catch {
      console.log(`Operation failed`);
    }
  },
};
