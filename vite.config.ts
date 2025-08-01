import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		host: "0.0.0.0", // Прослушивание на всех интерфейсах
		port: 3000, // Указание порта
		allowedHosts: ["iketel.ru"],
		proxy: {
			"/api": {
				target: "http://localhost:8000",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
			"/sio": {
				target: "http://localhost:8000",
				changeOrigin: true,
				ws: true,
			},
		},
	},
});
