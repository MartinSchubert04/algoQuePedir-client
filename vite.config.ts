import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react-swc"
import svgr from "vite-plugin-svgr" //si te chilla ejecutar: npm install vite-plugin-svgr
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@domain": path.resolve(__dirname, "src/domain"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@service": path.resolve(__dirname, "src/service"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@context": path.resolve(__dirname, "src/context"),
    },
  },
  test: {
    exclude: ["**/node_modules/**", "**/dist/**", "**/tests/**.spec.ts"],
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["lcov", "json", "html", "json-summary"],
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
})
