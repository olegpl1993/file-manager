import { actionsList } from "./actionsList.js";

export const inputActions = (input) => {
  try {
    const [actionName, ...args] = input.trim().split(" "); // получаем имя действия и списка аргументов
    const joinedArgs = args.join(" "); // объединяем аргументы
    const action = actionsList[actionName]; // получаем действие
    action(joinedArgs); // вызываем действие
  } catch {
    console.log("Invalid input"); // в случае не корректного ввода выводим сообщение
  }
};
