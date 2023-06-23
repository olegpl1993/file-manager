import { actionsList } from "./actionsList.js";

export const inputActions = (input) => {
  try {
    const [actionName, ...args] = input.trim().split(" "); // получаем имя действия и списка аргументов
    const joinedArgs = args.join(" "); // объединяем аргументы
    console.log("test action:", actionName);
    console.log("test args:", joinedArgs);
    const action = actionsList[actionName]; // получаем действие
  } catch {
    console.log("Invalid input"); // в случае не корректного ввода выводим сообщение
  }
  try {
    action(); // вызываем действие
  } catch {
    console.log("Operation failed"); // в случае ошибки выполнеения выводим сообщение
  }
};
