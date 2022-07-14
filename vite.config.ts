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
    postcss: {
      plugins: [postcssPresetEnv],
    },
  },
});
