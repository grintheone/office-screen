import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), svgr()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 9000,
        proxy: {
            '/api': {
                target: 'http://localhost:3010',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/cloud': {
                target: 'https://s3.storage.vbest.ru',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/cloud/, ''),
            }
        }
    },
});
