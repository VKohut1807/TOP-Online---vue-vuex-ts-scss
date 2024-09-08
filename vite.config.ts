import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  server: {
    port: 5000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@scss": path.resolve(__dirname, "./src/scss"),
      "@svg": path.resolve(__dirname, "./src/svg"),
    },
  },
});
