import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Password Generator",
        short_name: "PWG",
        description: "Generate random passwords and passphrases",
        theme_color: "#3DB9CF",
        icons: [
          {
            src: "/implement-app-ideas/intermediate/password-generator/out/icons8-keepass-ios-16-192.png",
            sizes: "192x192",
            type: "image/png",
            density: "4.0",
          },
          {
            src: "/implement-app-ideas/intermediate/password-generator/out/icons8-keepass-ios-16-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  base: "/implement-app-ideas/intermediate/password-generator/out/",
  build: {
    outDir: "./out",
  },
});
