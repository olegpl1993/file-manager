import readline from "readline";
import { getUsername } from "./helpers/getUsername.js";
import { inputActions } from "./helpers/inputActions.js";
import os from "os";

// npm run start -- --username=Oleg

const username = getUsername(); // получаем имя пользователя
const homeDirectory = os.homedir(); // получаем директорию пользователя
export let currentDirectory = homeDirectory; // текущая директория
export const setCurrentDirectory = (newDirectory) => {
  currentDirectory = newDirectory;
};

const app = () => {
  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${homeDirectory}`);

  // интерфейс для чтения ввода из консоли
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // обработчик ввода
  rl.on("line", (input) => {
    inputActions(input);
    console.log(`You are currently in ${currentDirectory}`);
  });

  // обработчик завершения работы
  process.on("exit", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });
};

app();
