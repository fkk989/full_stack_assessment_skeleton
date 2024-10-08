import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
    port: 3000,
  },
  preview: {
    proxy: {
      "/api": "http://localhost:8000",
    },
    port: 3000,
  },
});
