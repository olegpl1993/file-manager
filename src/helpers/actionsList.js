import path from "path";
import fs from "fs";
import os from "os";
import crypto from "crypto";
import zlib from "zlib";
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
          return a.Name.localeCompare(b.Name);
        } else {
          return a.Type.localeCompare(b.Type);
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
      const readStream = fs.createReadStream(pathToFile, "utf8");
      for await (const chunk of readStream) {
        console.log(chunk);
      }
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
        console.log("eol: ", JSON.stringify(eol));
      }
      if (args.includes("--cpus")) {
        const cpus = os.cpus();
        cpus.forEach((cpu, index) => {
          const { model, speed } = cpu;
          console.log(`CPU ${index + 1}: ${model} - ${speed / 1000} GHz`);
        });
      }
      if (args.includes("--homedir")) {
        const homeDirectory = os.homedir();
        console.log(homeDirectory);
      }
      if (args.includes("--username")) {
        const username = os.userInfo().username;
        console.log(username);
      }
      if (args.includes("--architecture")) {
        const arch = process.arch;
        console.log(arch);
      }
    } catch {
      console.log(`Operation failed`);
    }
  },
  hash: async (joinedArgs) => {
    try {
      const pathToFile = path.join(currentDirectory, joinedArgs);
      const data = await fs.promises.readFile(pathToFile, "utf8");
      const hash = crypto.createHash("sha256").update(data).digest("hex");
      console.log(hash);
    } catch {
      console.log(`Operation failed`);
    }
  },
  compress: async (joinedArgs) => {
    try {
      const [fileName, pathToDirectory] = joinedArgs.split(" ", 2);
      const pathToFile = path.join(currentDirectory, fileName);
      const pathToNewFile = path.join(pathToDirectory, fileName + ".br");

      const inputStream = fs.createReadStream(pathToFile);
      const outputStream = fs.createWriteStream(pathToNewFile);
      const brotliStream = zlib.createBrotliCompress();

      inputStream.pipe(brotliStream).pipe(outputStream);
    } catch {
      console.log(`Operation failed`);
    }
  },
  decompress: async (joinedArgs) => {
    try {
      const [fileName, pathToDirectory] = joinedArgs.split(" ", 2);
      const pathToFile = path.join(currentDirectory, fileName);
      const pathToNewFile = path.join(
        pathToDirectory,
        path.basename(fileName, path.extname(fileName))
      );

      const inputStream = fs.createReadStream(pathToFile);
      const outputStream = fs.createWriteStream(pathToNewFile);
      const brotliStream = zlib.createBrotliDecompress();

      inputStream.pipe(brotliStream).pipe(outputStream);
    } catch {
      console.log(`Operation failed`);
    }
  },
};
