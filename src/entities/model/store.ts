import { create } from "zustand";

interface UserStore {
	email: string;
	username: string;

	setUser: (email: string, username: string) => void;
}
export const useUserStore = create<UserStore>((set) => ({
	email: "",
	username: "",
	setUser: (email: string, username: string) =>
		set(() => ({ email: email, username: username })),
}));
