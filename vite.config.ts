import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
    build: {
        modulePreload: {
            polyfill: true,
        },
        rollupOptions: {
            output: {
                manualChunks: undefined, // Single bundle = easier for Babel
            },
        },
    },
    plugins: [
        react(),
        tailwindcss(),
        svgr(),
        legacy({
            targets: ["defaults", "not IE 11"],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime']
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 9000,
        proxy: {
            "/api": {
                target: "http://localhost:3010",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
            "/cloud": {
                target: "https://s3.int.best",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/cloud/, ""),
            },
        },
    },
});
