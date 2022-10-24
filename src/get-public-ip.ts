import axios from "axios";
import chalk from "chalk";

const IPV4: string = "https://api.ipify.org";
const IPV6: string = "https://api6.ipify.org";

export default async function getIP({ useIPv6 = false, endpoint = "" } = {}) {
  if (endpoint === "") {
    endpoint = useIPv6 ? IPV6 : IPV4;
  }
  const { data } = await axios.get(endpoint);
  console.log(`\n 🌐 ip: ${chalk.green(data)} \n`);
  return data;
}
