import os from "os";

export const osActions = async (joinedArgs) => {
  try {
    const args = joinedArgs.split(" ");
    if (args.includes("--EOL")) {
      const eol = os.EOL;
      console.log("eol: ", JSON.stringify(eol));
    }
    if (args.includes("--cpus")) {
      const cpus = os.cpus();
      cpus.forEach((cpu, index) => {
        const { model, speed } = cpu;
        console.log(`CPU ${index + 1}: ${model} - ${speed / 1000} GHz`);
      });
    }
    if (args.includes("--homedir")) {
      const homeDirectory = os.homedir();
      console.log(homeDirectory);
    }
    if (args.includes("--username")) {
      const username = os.userInfo().username;
      console.log(username);
    }
    if (args.includes("--architecture")) {
      const arch = process.arch;
      console.log(arch);
    }
  } catch {
    console.log(`Operation failed`);
  }
};
