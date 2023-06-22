const getUsername = () => {
  const args = process.argv; // массив аргументов
  const username = args[2].split("=")[1]; // имя пользователя
  return username;
}

export default getUsername;
