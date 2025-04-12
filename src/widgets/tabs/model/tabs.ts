import { create } from "zustand";

interface TabsType {
	selectedInd: number;
	setSelected: (id: number) => void;
}

export const useTabsModel = create<TabsType>()((set) => ({
	selectedInd: 0,
	setSelected: (ind: number) => {
		set({ selectedInd: ind });
	},
}));
