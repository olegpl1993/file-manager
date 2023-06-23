import readline from "readline";
import { getUsername } from "./helpers/getUsername.js";
import { inputActions } from "./helpers/inputActions.js";

// npm run start -- --username=Oleg

const app = () => {
  const username = getUsername(); // получаем имя пользователя
  console.log(`Welcome to the File Manager, ${username}!`); // выводим приветствие

  // интерфейс для чтения ввода из консоли
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // обработчик ввода
  rl.on("line", (input) => {
    inputActions(input);
  });

  // обработчик завершения работы
  process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });
};

app();
