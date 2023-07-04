import { actionsList } from "../actions/actionsList.js";

export const inputActions = async (input) => {
  try {
    const [actionName, ...args] = input.trim().split(" "); // получаем имя действия и списка аргументов
    const joinedArgs = args.join(" "); // объединяем аргументы
    const action = actionsList[actionName]; // получаем действие
    await action(joinedArgs); // вызываем действие
  } catch {
    console.log("Invalid input"); // в случае не корректного ввода выводим сообщение
  }
};
