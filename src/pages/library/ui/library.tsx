import type { WorldPreviewType } from "@/entities/world/types/types";
import { wordsListRequest } from "@/pages/library/api/worlds-api";
import Preloader from "@/shared/preloader/preloader";
import { useNavbarStore } from "@/widgets/navbar/model/navbarState";
import WorldsGrid from "@/widgets/worlds-grid";
import { useEffect, useState, useCallback } from "react";

function Library() {
	const { setSelectedIndex } = useNavbarStore();

	const [worlds, setWorlds] = useState<WorldPreviewType[]>([]);
	const [loading, setLoading] = useState(true);

	// Загрузка списка публичных миров
	const loadWorlds = useCallback(async () => {
		try {
			const data = await wordsListRequest();
			console.log(data);
			setWorlds(data);
			setLoading(false);
		} catch (error) {
			console.error("Ошибка при загрузке миров:", error);
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		setSelectedIndex(1);
		loadWorlds();
	}, [setSelectedIndex, loadWorlds]);

	return loading ? <Preloader /> : <WorldsGrid worlds={worlds} />;
}

export default Library;
