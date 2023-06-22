import getUsername from "./helpers/getUsername.js";
const app = () => {
  const username = getUsername();   // получаем имя пользователя
  console.log(`Welcome to the File Manager, ${username}!`); // выводим приветствие

  // cоздаем интерфейс для чтения ввода из консоли
  // const rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  // });
};

app();

// npm run start -- --hello=world --username=your_username --password=your_password
