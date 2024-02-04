import os from "os";

export function printOSInfo(command) {
  if (command.length > 0) {
    switch (command[0].toLowerCase()) {
      case "--eol":
        console.log(`Default system End-Of-Line: ${JSON.stringify(os.EOL)}`);
        break;
      case "--cpus":
        const cpus = os.cpus();
        console.log(`Overall amount of CPUs: ${cpus.length}`);
        cpus.forEach((cpu, index) => {
          console.log(`CPU ${index + 1} Model: ${cpu.model}`);
          console.log(`GHz: ${cpu.speed / 1000}`);
        });
        break;
      case "--homedir":
        console.log(`Home directory: ${os.homedir()}`);
        break;
      case "--username":
        console.log(`Current system username: ${os.userInfo().username}`);
        break;
      case "--architecture":
        console.log(
          `CPU architecture: ${os.arch()}`
        );
        break;
      default:
        console.error("Operation failed: invalid os operation.");
    }
  } else {
    console.error("No os operation specified.");
  }
}
