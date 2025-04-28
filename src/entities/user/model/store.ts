import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
	email: string;
	username: string;
	token: string;

	setUser: ({
		email,
		username,
		token,
	}: { email: string; username: string; token: string }) => void;
	setToken: (token: string) => void;
	clearUser: () => void;
	validateToken: () => Promise<boolean>;
}

export const useUserStore = create<UserStore>()(
	persist(
		(set, get) => ({
			email: "",
			username: "",
			token: "",

			setUser: ({ email, username, token }) =>
				set(() => ({ email, username, token })),

			setToken: (token: string) => set(() => ({ token })),

			clearUser: () => set(() => ({ email: "", username: "", token: "" })),

			isAuthenticated: () => {
				const token = get().token;
				if (!token) return false;
				return true;
			},

			validateToken: async () => {
				const token = get().token;
				if (!token) return false;

				try {
					const response = await fetch("http://localhost:8000/auth/validate", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					if (!response.ok) throw new Error("Invalid token");
					return true;
				} catch (error) {
					// Если ошибка (сервер сдох или токен невалидный) — чистим стор
					get().clearUser();
					return false;
				}
			},
		}),
		{
			name: "user-storage",
		},
	),
);
