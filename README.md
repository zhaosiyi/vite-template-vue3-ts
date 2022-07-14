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

在 `vite.config.js` 中添加以下内容：
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

