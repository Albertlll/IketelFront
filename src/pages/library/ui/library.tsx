import type { WorldPreviewType } from "@/entities/world/types/types";
import { wordsListRequest } from "@/pages/library/api/worlds-api";
import Preloader from "@/shared/preloader/preloader";
import { useNavbarStore } from "@/widgets/navbar/model/navbarState";
import WorldsGrid from "@/widgets/worlds-grid";
import { useEffect, useState } from "react";

function Library() {
	const { setSelectedIndex } = useNavbarStore();

	const [worlds, setWorlds] = useState<WorldPreviewType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setSelectedIndex(1);

		wordsListRequest().then((data) => {
			console.log(data);
			setWorlds(data);
			setLoading(false);
		});
	}, [setSelectedIndex]);

	return loading ? <Preloader /> : <WorldsGrid worlds={worlds} />;
}

export default Library;
