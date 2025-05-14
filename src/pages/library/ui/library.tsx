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

	// Обработчик изменения публичности мира
	const handleWorldVisibilityChange = useCallback((worldId: number, isPublic: boolean) => {
		// Если мир стал приватным, удаляем его из списка публичных миров
		if (!isPublic) {
			setWorlds((prevWorlds) => prevWorlds.filter((world) => world.id !== worldId));
		} else {
			// Обновляем статус публичности
			setWorlds((prevWorlds) =>
				prevWorlds.map((world) =>
					world.id === worldId ? { ...world, is_public: isPublic } : world
				)
			);
		}
	}, []);

	useEffect(() => {
		setSelectedIndex(1);
		loadWorlds();
	}, [setSelectedIndex, loadWorlds]);

	return loading ? (
		<Preloader />
	) : (
		<WorldsGrid
			worlds={worlds}
			onWorldVisibilityChange={handleWorldVisibilityChange}
		/>
	);
}

export default Library;
