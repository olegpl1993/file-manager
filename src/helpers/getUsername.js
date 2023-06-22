export const getUsername = () => {
  const args = process.argv; // массив аргументов
  const userNameArg = args.find((str) => str.startsWith("--username=")); // аргумент с именем пользователя
  const username = userNameArg ? userNameArg.slice(11) : "Anonymous"; // имя пользователя
  return username;
};
