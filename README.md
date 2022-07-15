# 项目配置说明

本项目为自己常用的 Vite + Vue3 + TS 项目模板，整合了以下内容：

- [x] [Prettier](https://github.com/prettier/prettier)
- [x] [SASS](https://github.com/sass)
- [x] [PostCSS](https://github.com/postcss/postcss)
- [x] [ESLint](https://github.com/eslint/eslint)
- [ ] [StyleLint](https://github.com/stylelint/stylelint)

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

当没有安装 Node 的 TypeScript 类型库时，可能会出现 ts 无法识别 `path` 和 `__dirname` 等名称的问题。
可以通过安装 `@types/node` 类型库来解决问题：

```sh
npm i -D @types/node
```

## `vite.config.js` 的其他配置

这里主要在 `vite.config.js` 中添加了以下内容：

- 设置 `server` 选项来让 Vite 在启动服务器时自动在浏览器中打开页面。
- 设置 `build` 选项来自定义 Vite 打包项目的结构。

修改后的 `vite.config.js` 内容如下：

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '/@': path.resolve(__dirname, 'src') },
  },
  server: {
    open: true, // 启动后自动在浏览器打开页面
  },
  build: {
    assetsDir: 'static', // 静态资源的存放路径
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js', // js 文件的存放位置
        entryFileNames: 'static/js/[name]-[hash].js', // js 入口文件的存放位置
        assetFileNames: 'static/[ext]/name-[hash].[ext]', // 其他资源的存放位置
      },
    },
  },
});
```

## 引入 Prettier

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

## 引入 SASS

Vite 原生支持 SASS，我们仅需安装 `SASS` 库就可直接 `import 'xxx.scss'` 或者在 `.vue` 文件中使用 `<style lang="scss">`：

```sh
npm i -D sass
```

在 `vite.config.js` 中可以配置 SASS 的全局代码，常用于引入全局变量等内容：

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '/@': path.resolve(__dirname, 'src') },
  },
  server: { open: true },
  build: {
    assetsDir: 'static',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/name-[hash].[ext]',
      },
    },
  },
  // 新增代码
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '/@/styles/global.scss';`, // 引入 scss 全局变量
      },
    },
  },
});
```

## 配置 PostCSS

Vite 内置了 PostCSS，所以无需安装 PostCSS 本体，直接安装插件并进行配置即可。
这里仅使用了 [postcss-preset-env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env) 插件，用于提供 CSS 特性的 polyfills 和部分属性的浏览器前缀。

首先安装这个插件：

```sh
npm i -D postcss-preset-env
```

然后在 `vite.config.js` 中进行配置：

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import postcssPresetEnv from 'postcss-preset-env';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '/@': path.resolve(__dirname, 'src') },
  },
  server: { open: true },
  build: {
    assetsDir: 'static',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/name-[hash].[ext]',
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import '/@/styles/global.scss';` },
    },
    // 新增代码
    postcss: {
      plugins: [postcssPresetEnv], // 用于添加 polyfills 和属性前缀
    },
  },
});
```

最后还需在 `package.json` 中添加 `browserlists` 选项来告知插件浏览器环境：

```jsonc
{
  "browserlists": ["defaults"] // 添加这行代码
}
```

## 引入 ESLint

ESLint 用于检查脚本代码的潜在错误。
首先安装 ESLint：

```sh
npm i -D eslint
```

然后执行以下命令初始化 ESLint 的配置文件：

```sh
npx eslint --init
```

该命令询问的选项按以下选择：

- `How would you like to use ESLint?`：`To check syntax and find problems`
- `What type of modules does your project use?`：`JavaScript modules (import/export)`
- `Which framework does your project use?`：`Vue.js`
- `Does your project use TypeScript?`：`Yes`
- `Where does your code run?`：`Browser`
- `What format do you want your config file to be in?`：`JSON`

安装上述选项 ESLint 将会安装以下依赖库：

- `eslint-plugin-vue@latest`
- `@typescript-eslint/eslint-plugin@latest`
- `@typescript-eslint/parser@latest`

命令执行完后会生成一个 `.eslintrc.json` 配置文件，我们还需对其进行一定更改。

首先添加 `parser` 字段，来支持 ESLint 对 `.vue` 文件的解析：

```jsonc
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "vue-eslint-parser", // 新增代码
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": ["vue", "@typescript-eslint"],
  "rules": {}
}
```

然后为了避免 Prettier 格式化代码的规则与 ESLint 的检查规则发生冲突，还需安装以下插件：

```sh
npm i -D eslint-plugin-prettier eslint-config-prettier
```

安装后修改 `.eslintrc.json` 文件引入这些插件：

```jsonc
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended" // 新增代码
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": ["vue", "@typescript-eslint"],
  "rules": {
    "prettier/prettier": ["warn", {}, { "usePrettierrc": true }] // 新增代码
  }
}
```

最后需要在 `settings.json` 中添加相关配置以支持 [ESLint 的 VSCode 插件](https://github.com/Microsoft/vscode-eslint) 正常工作：

```jsonc
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.format.enable": false, // 新增代码，不使用 ESLint 进行格式化，而是使用 Prettier
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // 新增代码，在保存时尝试自动修复 ESLint 报错的内容
  },
  "path-intellisense.autoTriggerNextSuggestion": true,
  "path-intellisense.extensionOnImport": true,
  "path-intellisense.mappings": {
    "/@": "${workspaceRoot}/src"
  }
}
```

另外还需添加 `.eslintignore` 文件用于设置忽略的文件：

```
node_modules
dist
```

## 引入 stylelint

ESLint 用于检查脚本代码，而 StyleLint 用于检查样式代码。
首先安装 StyleLint：

```sh
npm i -D stylelint
```

然后安装 StyleLint 的几个常用插件：

- [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss)：用于解析 `.scss` 文件并引入相关规则。
- [stylelint-config-standard-vue](https://github.com/ota-meshi/stylelint-config-standard-vue)：用于支持 `.vue` 文件的解析并引入相关规则。
- [stylelint-config-rational-order](https://github.com/constverum/stylelint-config-rational-order)：用于支持 CSS 属性排序功能。
- [stylelint-config-prettier](https://github.com/prettier/stylelint-config-prettier)：用于解决和 Prettier 的冲突。

```sh
npm i -D stylelint-config-standard-scss
npm i -D postcss-html stylelint-config-standard-vue
npm i -D stylelint-order stylelint-config-rational-order
npm i -D stylelint-config-prettier
```
