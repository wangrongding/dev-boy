import { Command } from "commander";
import packageJsonData from "../package.json" assert { type: "json" };
import getIP from "./modules/get-ip";
import folderPrint from "./modules/folder-print";

const { version, name } = packageJsonData;

// const { version } = JSON.parse(fs.readFileSync("package.json", "utf8"));

const program = new Command(name);
program
  .alias("db")
  .description(
    "A super powerful cli tool-set to quickly do some common operations in the terminal."
  )
  .version(version, "-v, --version, -V");
program
  .command("ip")
  .description("Get the local external network i p address")
  .option("-i, --intranet", "Get ip for intranet or extranet")
  .action(getIP);
program
  .command("folder-print")
  .alias("fp")
  .option(
    "-d, --depth <type>",
    "Set the depth of the folder to be traversed",
    "10"
  )
  .option("-p, --print", "Generate a markdown file")
  .description("Print directory structure")
  .action(folderPrint);
program.parse();
