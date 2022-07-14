# 项目配置说明

本项目为自己常用的 Vite + Vue3 + TS 项目模板，整合了以下内容：

- [ ] Prettier
- [ ] SASS
- [ ] PostCSS
- [ ] ESLint
- [ ] StyleLint

下面会记录项目配置的具体过程。

## 初始化 Vite 项目和 git 仓库

初始化 Vite 项目：

```sh
npm init vite@latest
```

其中 Vite 询问的选项选择如下：

- `Select a framework: » vue`
- `Select a variant: » vue-ts`

然后安装依赖库：

```sh
npm i
```

最后初始化 git 仓库并提交：

```sh
git init
git add *
git commit -m "初始化项目"
git remote add origin git@github.com:zhaosiyi/vite-template-vue3-ts.git
git push -u origin master
```

之后将省略 git 操作。

## 配置 `/@` 路径别名

在 `vite.config.js` 中添加以下内容即可完成路径别名 `/@` 的配置：

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // 新增代码

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '/@': path.resolve(__dirname, 'src') }, // 新增代码
  },
});
```

然后为了让 VSCode 中的 [Path Intellisense](https://github.com/ChristianKohler/PathIntellisense) 插件也能识别路径别名，需要在 `.vscode` 文件夹下新建 `settings.json` 文件，并添加以下内容：

```jsonc
{
  "path-intellisense.autoTriggerNextSuggestion": true, // 在补全后自动弹出下一条补全建议
  "path-intellisense.extensionOnImport": true, // 为补全的文件添加后缀名
  "path-intellisense.mappings": {
    "/@": "${workspaceRoot}/src" // 如果 vite 或 webpack 等构建工具配置了路径别名，需要在这里也同时设置，不然插件无法识别这些别名
  }
}
```

之后 VSCode 就可以识别 `/@` 别名并给出正确的路径补全提示。

## 安装 [@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.zh.md) 类型库

出现 ts 无法识别 `path` 和 `__dirname` 这样的 Node 内置名称等问题时，安装这个库可以解决问题：

```sh
npm i -D @types/node
```

## `vite.config.js` 的其他配置

TODO

## 引入 [Prettier](https://github.com/prettier/prettier)

该工具用于格式化代码，保证项目代码风格统一。
首先安装 Prettier：

```sh
npm i -D prettier
```

然后在根目录创建 Prettier 的配置文件 `.prettierrc`，并添加以下内容：

```jsonc
{
  "endOfLine": "auto", // 保留源文件的换行格式
  "semi": true, // 在语句末尾添加分号
  "singleQuote": true, // 尽量使用单引号
  "tabWidth": 2 // 控制 Tab 长度为 2 个空格
}
```

为了让 [Prettier 的 VSCode 插件](https://github.com/prettier/prettier-vscode) 支持在保存时自动格式化的功能，在 `settings.json` 中添加以下内容：

```jsonc
{
  "editor.defaultFormatter": "esbenp.prettier-vscode", // 将默认的格式化工具设置为 Prettier
  "editor.formatOnSave": true // 在保存时自动格式化代码
}
```

如果有不希望 Prettier 进行格式化的文件，可以在项目根目录创建一个 `.prettierignore` 文件，像 `.gitignore` 那样设置 Prettier 忽略的文件：

```
node_modules
dist
```

如果希望一次性格式化项目中的所有文件（ `.prettierignore` 中的文件除外），可以执行：

```sh
npx prettier --write .
```
