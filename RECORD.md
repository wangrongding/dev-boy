```sh
# 交互工具
pnpm add commander inquirer ora chalk log-symbols download-git-repo
# 主要依赖
pnpm add typescript rollup rollup-plugin-terser rollup-plugin-typescript2  rollup-plugin-cleandir @rollup/plugin-json @types/inquirer -D
# 代码校验
pnpm add eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```

## 几个包的说明：

### 交互工具

- commander：命令行工具
- inquirer：命令行交互工具
- ora：命令行 loading
- chalk：命令行颜色
- log-symbols：命令行图标
- download-git-repo：下载远程模板

### 主要依赖

- typescript：typescript
- rollup：打包工具
- rollup-plugin-terser：压缩工具
- rollup-plugin-typescript2：typescript 打包工具
- rollup-plugin-cleandir：清理目录
- @rollup/plugin-json：json 打包工具
- @types/inquirer：inquirer 类型

### 代码校验

- eslint：代码校验工具
- @typescript-eslint/eslint-plugin：typescript 代码校验工具
- @typescript-eslint/parser：typescript 代码校验工具
