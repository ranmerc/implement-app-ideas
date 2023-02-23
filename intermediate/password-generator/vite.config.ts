import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/implement-app-ideas/intermediate/password-generator/out/",
  build: {
    outDir: "./out",
  },
});
