import { create } from "zustand";

interface navbarStore {
	selectedIndex: number;
	setSelectedIndex: (val: number) => void;
}
export const useNavbarStore = create<navbarStore>((set) => ({
	selectedIndex: 0,
	setSelectedIndex: (val: number) => set({ selectedIndex: val }),
}));
