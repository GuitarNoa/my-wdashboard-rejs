import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import history from "connect-history-api-fallback";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    middlewareMode: true,
    setupMiddlewares: (middlewares) => {
      middlewares.use(history());
      return middlewares;
    },
  },
});
