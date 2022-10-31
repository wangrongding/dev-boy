import os from "os";

// 秒钟转换为天时分秒
const dealTime = (time) => {
  let d = Math.floor(time / (24 * 3600));
  let h = Math.floor((time % (24 * 3600)) / 3600);
  let m = Math.floor((time % 3600) / 60);
  let s = Math.floor(time % 60);
  return `${d}天${h}小时${m}分钟${s}秒`;
};

// 字节转换实际大小
const dealMem = (mem) => {
  let G: number | string = 0,
    M: number | string = 0,
    KB: number | string = 0;
  mem > 1 << 30 && (G = (mem / (1 << 30)).toFixed(2));
  mem > 1 << 20 && mem < 1 << 30 && (M = (mem / (1 << 20)).toFixed(2));
  mem > 1 << 10 && mem > 1 << 20 && (KB = (mem / (1 << 10)).toFixed(2));
  return G > 0 ? G + "G" : M > 0 ? M + "M" : KB > 0 ? KB + "KB" : mem + "B";
};

//这里获取的是CPU总信息
function getCPUInfo(callback?: () => {}) {
  let cpus = os.cpus();
  let user = 0;
  let nice = 0;
  let sys = 0;
  let idle = 0;
  let irq = 0;
  let total = 0;

  for (let cpu in cpus) {
    user += cpus[cpu].times.user;
    nice += cpus[cpu].times.nice;
    sys += cpus[cpu].times.sys;
    irq += cpus[cpu].times.irq;
    idle += cpus[cpu].times.idle;
  }

  total = user + nice + sys + idle + irq;

  callback ? callback() : "";

  return {
    idle: idle,
    total: total,
  };
}

//获取CPU使用率
// cpu是变化的，这里用一秒的时间隔来计算。得到时间差来反映CPU的延迟，侧面反映了CPU的使用率。
function getCPUUsage(callback: any, free: boolean) {
  let stats1 = getCPUInfo();
  let startIdle = stats1.idle;
  let startTotal = stats1.total;

  setTimeout(function () {
    let stats2 = getCPUInfo();
    let endIdle = stats2.idle;
    let endTotal = stats2.total;

    let idle = endIdle - startIdle;
    let total = endTotal - startTotal;
    let perc = idle / total;

    if (free === true) callback(perc);
    else callback(1 - perc);
  }, 1000);
}
export const cpuUsage = function (callback) {
  getCPUUsage(callback, false);
};

export default function getSystemInfo() {
  console.log("getSystemInfo", {
    platform: process.platform,
    arch: process.arch,
    version: process.version,
  });
  console.log("🚀 系统信息：");
  console.log(` - 主机名：${os.hostname()}`);
  console.log(` - 操作系统名：${os.type()}`);
  console.log(` - 操作系统平台：${os.platform()}`);
  console.log(` - 操作系统CPU架构：${os.arch()}`);
  console.log(` - 系统运行的时间：${dealTime(os.uptime())}`);

  console.log(` - 内存总量：${dealMem(os.totalmem())}`);
  console.log(` - 空闲内存量：${dealMem(os.freemem())}`);

  console.log(
    ` - 内存使用占比：${Number(
      (1 - os.freemem() / os.totalmem()) * 100
    ).toFixed(2)}%`
  );

  // console.log(process.memoryUsage());
  // console.log(` - 内存总量：${dealMem(process.memoryUsage().heapTotal)}`);
  // console.log(` - 空闲内存量：${dealMem(process.memoryUsage().heapUsed)}`);
  // console.log(
  //   ` - 内存使用占比：${Number(
  //     (1 - process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) *
  //       100
  //   ).toFixed(2)}%`
  // );

  cpuUsage((perc) => {
    console.log(` - CPU使用占比：${Number(perc * 100).toFixed(2)}%`);
  });

  console.log(` - CPU核心数：${os.cpus().length}`);
  console.log(` - CPU型号：${os.cpus()[0].model}`);
  console.log(` - CPU速度：${os.cpus()[0].speed}MHz`);
}
