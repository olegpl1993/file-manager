import getUsername from "./getUsername.js";
const app = () => {
  const username = getUsername();
  console.log(`Welcome to the File Manager, ${username}!`);
};

app();

// npm run start -- --username=your_username
