import getUsername from "./getUsername.js";
const app = () => {
  const username = getUsername();
  console.log(username);
};

app();

// npm run start -- --username=your_username
