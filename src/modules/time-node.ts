import chalk from "chalk";
import axios from "axios";

// 获取当前时间
const now = new Date().getTime();
// 获取当前年份
const year = new Date().getFullYear();
// 获取当前月份
const month = new Date().getMonth() + 1;
// 获取当前日
const date = new Date().getDate();
// 获取当前星期几
const weekList = ["日", "一", "二", "三", "四", "五", "六"];
const day = weekList[new Date().getDay()];
// 获取当前小时
const hours = new Date().getHours();
// 获取当前分钟
const minutes = new Date().getMinutes();

// 今天是一年中的第几天
const dayOfYear = Math.ceil(
  (now - new Date(new Date().getFullYear(), 0, 0).getTime()) /
    1000 /
    60 /
    60 /
    24
);
// 剩余天数
const remainingDays = 365 - dayOfYear;

// 打印时间进度条
export function printTimeProgress() {
  const timeProgress = dayOfYear / 365;
  const timeProgressStr = Number((timeProgress * 100).toFixed(2)) + "%";
  const tag = chalk.red("█");
  // const tag = "█";
  const endTag = chalk.green("░");

  const timeProgressBarLength = 20;
  const timeProgressBar = new Array(timeProgressBarLength)
    .fill(tag)
    .fill(endTag, Math.floor(timeProgressBarLength * timeProgress))
    .join("");

  return {
    timeProgress,
    timeProgressStr,
    timeProgressBar,
  };
}

// 获取最近的一个节日
export async function getRecentHoliday() {
  // https://timor.tech/api/holiday/next/2022-11-1?type=Y
  // http://timor.tech/api/holiday/tts
  // 下一个节假日
  // const nextHoliday = await axios.get(
  //   `https://timor.tech/api/holiday/next/${year}-${month}-${date}?type=Y`
  // );
  // 转 json
  // const nextHolidayJson = JSON.parse(JSON.stringify(nextHoliday.data));
  // console.log("🚀🚀🚀 / nextHoliday", nextHoliday.data);
  // console.log("🚀🚀🚀 / nextHoliday", nextHolidayJson);

  // 最近的节假日
  // const recentHoliday = await axios.get(`https://timor.tech/api/holiday/tts`);
  // console.log("🚀🚀🚀 / recentHoliday", JSON.parse(recentHoliday.data));

  // axios
  //   .get("https://timor.tech/api/holiday/tts", {
  //     headers: {
  //       accept:
  //         "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  //       "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
  //       "cache-control": "no-cache",
  //       pragma: "no-cache",
  //       "sec-ch-ua":
  //         '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
  //       "sec-ch-ua-mobile": "?0",
  //       "sec-ch-ua-platform": '"macOS"',
  //       "sec-fetch-dest": "document",
  //       "sec-fetch-mode": "navigate",
  //       "sec-fetch-site": "none",
  //       "sec-fetch-user": "?1",
  //       "upgrade-insecure-requests": "1",
  //       cookie:
  //         "Hm_lvt_f497f00a5871b6ed9078f87ab818d62d=1667196374; Hm_lpvt_f497f00a5871b6ed9078f87ab818d62d=1667197248; sid=",
  //     },
  //     method: "GET",
  //   })
  //   .then((res) => {
  //     console.log("🚀🚀🚀 / res", res);
  //   });

  axios.get("https://timor.tech/api/holiday/tts").then((res) => {
    console.log("🚀🚀🚀", res);
  });

  return {
    // nextHoliday: nextHoliday.data,
    // recentHoliday: recentHoliday.data,
  };
}

export default function getTimeNode() {
  const { timeProgressBar, timeProgressStr } = printTimeProgress();
  console.log(
    `\n🌸现在是${year}年${month}月${date}日 ${hours}:${minutes} 星期${day}`
  );
  console.log(
    `\n${chalk.blue(year)} 年已经过了 ${chalk.red(
      dayOfYear
    )} 天，还剩 ${chalk.green(remainingDays)} 天`
  );
  console.log(`\n时间进度条：${timeProgressBar}|${timeProgressStr}\n`);
  // getRecentHoliday();
}
