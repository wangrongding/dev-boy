import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import typescript2 from "rollup-plugin-typescript2";
import del from "rollup-plugin-delete";
// import pkg from "./package.json" assert { type: "json" };

// const external = Object.keys(pkg.dependencies || "");
// const globals = external.reduce((prev, current) => {
//   const newPrev = prev;
//   newPrev[current] = current;
//   return newPrev;
// }, {});

const defaultConfig = {
  input: "./src/index.ts",
  output: {
    dir: "./lib", // 输出目录
    format: "es", // 输出格式, 可选值: amd, cjs, es, iife, umd
    banner: "#!/usr/bin/env node", // 添加头部
    // sourcemap: true, // 是否生成sourcemap, 默认为false
    // globals, // 外部依赖,
  },
  // external,
  plugins: [
    // 使用typescript2插件
    typescript2(),
    // 解析json文件
    json(),
    // 清理输出目录
    // del({
    //   targets: "lib/*",
    //   // verbose: true, // 打印删除的文件
    // }),

    // 压缩代码
    // terser(),
    // typescript2({
    //   // exclude: "node_modules/**",
    //   // useTsconfigDeclarationDir: true,
    //   // typescript,
    //   // tsconfig: "./tsconfig.json",
    // }),
  ],
};

export default defaultConfig;
