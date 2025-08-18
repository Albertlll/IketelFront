// import { io } from "socket.io-client";
// import { useUserStore } from "../../entities/user/model/store";

// // const SOCKET_URL = "ws://localhost:8000";
// // const SOCKET_URL = "wss://iketel.ru";

// // Создаем инстанс с относительным URL для использования прокси
// const socket = io({
// 	path: "/sio",
// 	autoConnect: false,
// 	withCredentials: true,
// 	transports: ["websocket"],
// });

// socket.on("connect_error", (err) => {
// 	if (err.message === "Unauthorized") {
// 		useUserStore.getState().clearUser();
// 		window.location.href = "/login";
// 	}
// });

// // Функция для безопасного подключения с токеном
// export const connectSocket = () => {
// 	const token = useUserStore.getState().token;

// 	if (token) {
// 		socket.auth = { token }; // Передаем токен в auth
// 		socket.connect(); // Подключаемся

// 		// Логируем события для отладки
// 		socket.on("connect", () => {
// 			console.log("✅ Connected! Socket ID:", socket.id);
// 		});

// 		socket.on("connect_error", (err) => {
// 			console.error("❌ Connection failed:", err.message);
// 		});

// 		return socket;
// 	}
// };
// export default socket;






import { useUserStore } from "@/entities/user/model/store";
import { io, Socket } from "socket.io-client";

// const SOCKET_URL = "ws://localhost:8000";
// const SOCKET_URL = "wss://iketel.ru";
type EventCallback = (...args: any[]) => void;

class SocketService {
	private static instance : SocketService;
  private socket: Socket | null = null;
	
	public static getInstance() {
		if (!SocketService.instance) {
			SocketService.instance = new SocketService();
		}
		return SocketService.instance
	}

	public connect() : Promise<string> {
    if (!this.socket) {
			const token = useUserStore.getState().token;
      this.socket =io({
				path: "/sio",
				autoConnect: false,
				withCredentials: true,
				transports: ["websocket"],
			});
			this.socket.auth = { token };
    }
    return new Promise((resolve, reject) => {
    

      this.socket?.once("connect", () => {resolve("Подключено")})
      this.socket?.once("connect_error", (error) => {reject(error)})

      this.socket?.connect();
    })
	}

	public on(event: string, callback: EventCallback): void {
    this.socket?.on(event, callback);
  }

  public emit(event: string, data?: any): void {
    this.socket?.emit(event, data);
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}



export default SocketService;