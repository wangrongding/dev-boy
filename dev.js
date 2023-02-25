import chokidar from "chokidar";
import { spawn } from "child_process";

// 开发环境下，监听 lib 目录下的文件变化，重新构建
chokidar.watch("./lib").on("change", () => {
  // 重新 sudo npm link
  spawn("sudo", ["npm", "link"]);
});
