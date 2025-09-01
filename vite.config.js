import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // fallback ทุก route ไปที่ index.html สำหรับ SPA
    historyApiFallback: true, // Vite 4+ บางเวอร์ชันอาจต้องติดตั้ง connect-history-api-fallback
  },
});
