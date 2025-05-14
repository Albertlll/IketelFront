import type { WorldPreviewType } from "@/entities/world/types/types";
import Preloader from "@/shared/preloader/preloader";
import { useNavbarStore } from "@/widgets/navbar/model/navbarState";
import WorldsGrid from "@/widgets/worlds-grid";
import { useEffect, useState, useCallback } from "react";
import { userWordsListRequest } from "../api/worlds-api";

function Profile() {
	const { setSelectedIndex } = useNavbarStore();
	const [worlds, setWorlds] = useState<WorldPreviewType[]>([]);
	const [loading, setLoading] = useState(true);

	// Загрузка списка миров пользователя
	const loadUserWorlds = useCallback(async () => {
		try {
			const data = await userWordsListRequest();
			console.log(data);
			setWorlds(data);
			setLoading(false);
		} catch (error) {
			console.error("Ошибка при загрузке миров:", error);
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		setSelectedIndex(0);
		loadUserWorlds();
	}, [setSelectedIndex, loadUserWorlds]);

	// Обработчик удаления мира
	const handleWorldDelete = useCallback((worldId: number) => {
		// Обновляем список миров, удаляя мир с указанным ID
		setWorlds((prevWorlds) => prevWorlds.filter((world) => world.id !== worldId));
	}, []);

	return loading ? (
		<Preloader />
	) : (
		<WorldsGrid addBtn worlds={worlds} onWorldDelete={handleWorldDelete} />
	);
}

export default Profile;
