import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  env.BUILD_TIME = new Date().getDate()  + '.' + (new Date().getMonth()+1) + '.' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
  return {
    root: './src',
    server: { port: Number(env.PORT) || 3000, open: true },
    define: {
      'process.env': `(${JSON.stringify(env)})`
    },
    base: './',
    plugins: [checker({ typescript: true })],
    build: {
      chunkSizeWarningLimit: 2000,
      outDir: '../build',
      emptyOutDir: true,
      minify: true,
    },
  };
});
