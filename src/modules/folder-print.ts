import fs from "fs";
import path from "path";
import chalk from "chalk";

const __dirname = path.resolve();
// const { version } = JSON.parse(fs.readFileSync("package.json", "utf8"));

// 需要过滤的文件夹
const filterDir = [
  "node_modules",
  ".git",
  ".idea",
  "dist",
  "build",
  ".vscode",
  ".DS_Store",
];

// 项目名称
const folderName = `🌸 ${
  __dirname.split("/")[__dirname.split("/").length - 1]
} 🌸 \n`;
const colorFolderName = `🌸 ${chalk.greenBright(
  __dirname.split("/")[__dirname.split("/").length - 1]
)} 🌸\n`;
// 文件内容
let content = folderName;
// 带样式的内容
let colorContent = colorFolderName;
// 遍历深度
let depthNum: number = 10;
// 是否打印
let isPrint: boolean = false;

// 生成指定的连接符
function generateLine(index, length) {
  if (index === length) {
    return "└─ ";
  }
  return "├─ ";
}

// 生成指定的空格
function generateSpace(num) {
  let space = ``;
  for (let i = 0; i < num; i++) {
    // space += `   `;
    space += `│   `;
  }
  return space;
}

// 遍历文件夹，打印目录结构
export function printTree(dir = __dirname, spaceNum) {
  // 超出深度，不再遍历
  if (spaceNum > depthNum) {
    return;
  }
  // 读取文件夹
  const files = fs.readdirSync(dir).sort();
  // 按文件夹和首字母排序
  files.sort((a, b) => {
    const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
    const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
    if (aIsDir && !bIsDir) {
      return -1;
    } else if (!aIsDir && bIsDir) {
      return 1;
    } else {
      return a.localeCompare(b);
    }
  });

  const length = files.length - 1;
  // 遍历文件夹
  files.forEach((file, index) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    // 过滤文件夹
    if (filterDir.includes(file)) {
      return;
    }
    if (stats.isFile()) {
      const str = `${generateSpace(spaceNum)}${generateLine(
        index,
        length
      )}${file}`;
      content += `${str}\n`;
      colorContent += `${str}\n`;
    } else if (stats.isDirectory()) {
      const str = `${generateSpace(spaceNum)}${generateLine(
        index,
        length
      )}${file}`;
      const colorStr = `${generateSpace(spaceNum)}${generateLine(
        index,
        length
      )}${chalk.hex("#4dc4ff").bold(file)}`;
      content += `${str}\n`;
      colorContent += `${colorStr}\n`;
      printTree(filePath, spaceNum + 1);
    }
  });
}

// 打印目录结构
export default function folderPrint(options) {
  const { depth, print } = options;
  depthNum = depth;
  isPrint = print;

  printTree(__dirname, 0);
  if (isPrint) {
    // console.log(content);
    content = `\`\`\`sh \n${content}\`\`\``;
    fs.writeFileSync("folder-tree.md", content, "utf8");
    console.log("✅ 已将目录结构生成到 folder-tree.md 文件中");
  } else {
    console.log(colorContent);
  }
}
