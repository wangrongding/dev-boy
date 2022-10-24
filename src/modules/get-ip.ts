import axios from "axios";
import chalk from "chalk";
import os from "os";

const IPV4: string = "https://api.ipify.org";
const IPV6: string = "https://api6.ipify.org";

export default async function getIP(options) {
  const { useIPv6 = false, endpoint = "", intranet } = options;
  if (intranet) {
    getIntranetIp();
  } else {
    getExternalIp();
  }
}

// 获取内网ip
export function getIntranetIp(): string {
  const interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName]!;
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        console.log(`\n🌐 ip: ${chalk.green(alias.address)}`);
        console.log(`🌐 mac: ${chalk.green(alias.mac)}`);
        console.log(`🌐 netmask: ${chalk.green(alias.netmask)} \n`);

        return alias.address;
      }
    }
  }
  return "";
}

// 获取外网ip
export async function getExternalIp(
  useIPv6 = false,
  endpoint = ""
): Promise<string> {
  if (endpoint === "") {
    endpoint = useIPv6 ? IPV6 : IPV4;
  }
  const { data } = await axios.get(endpoint);
  console.log(`\n 🌐 ip: ${chalk.green(data)} \n`);
  return data;
}
