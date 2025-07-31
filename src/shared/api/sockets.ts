import { io } from "socket.io-client";
import { useUserStore } from "../../entities/user/model/store";

// const SOCKET_URL = "ws://localhost:8000";
// const SOCKET_URL = "wss://iketel.ru";

// Создаем инстанс с относительным URL для использования прокси
const socket = io({
	path: "/sio",
	autoConnect: false,
	withCredentials: true,
	transports: ["websocket"],
});

socket.on("connect_error", (err) => {
	if (err.message === "Unauthorized") {
		useUserStore.getState().clearUser();
		window.location.href = "/login";
	}
});

// Функция для безопасного подключения с токеном
export const connectSocket = () => {
	const token = useUserStore.getState().token;

	if (token) {
		socket.auth = { token }; // Передаем токен в auth
		socket.connect(); // Подключаемся

		// Логируем события для отладки
		socket.on("connect", () => {
			console.log("✅ Connected! Socket ID:", socket.id);
		});

		socket.on("connect_error", (err) => {
			console.error("❌ Connection failed:", err.message);
		});

		return socket;
	}
};
export default socket;
