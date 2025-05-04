import httpClient from "@/httpClient";
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
				try {
					await httpClient.get("/auth/validate");
					return true;
				} catch {
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
