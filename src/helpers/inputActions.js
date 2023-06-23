import { actionsList } from "./actionsList.js";

// обработчик строки ввода
export const inputActions = (input) => {
  try {
    const [actionName, ...args] = input.trim().split(" ");
    const joinedArgs = args.join(" ");
    console.log("test action:", actionName);
    console.log("test args:", joinedArgs);
    const action = actionsList[actionName];
    action();
  } catch (error) {
    console.log("Invalid input");
  }
};
