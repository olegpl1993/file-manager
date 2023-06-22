import { actionsList } from "./actionsList.js";

// обработчик строки ввода
export const inputActions = (input) => {
  try {
    const [actionName, ...args] = input.trim().split(' ');
    console.log('action:', actionName);
    console.log('args:', args);
    const action = actionsList[actionName];
    action();
  } catch (error) {
    console.log("Invalid input");
  }
};