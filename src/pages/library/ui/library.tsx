import type { WorldPreviewType } from "@/entities/world/types/types";
import { wordsListRequest } from "@/pages/library/api/worlds-api";
import { useNavbarStore } from "@/widgets/navbar/model/navbarState";
import WorldsGrid from "@/widgets/worlds-grid";
import { useEffect, useState } from "react";

function Library() {
	const { setSelectedIndex } = useNavbarStore();

	const [worlds, setWorlds] = useState<WorldPreviewType[]>([]);

	useEffect(() => {
		setSelectedIndex(1);

		wordsListRequest().then((data) => {
			console.log(data);
			setWorlds(data);
		});
	}, [setSelectedIndex]);

	return <WorldsGrid worlds={worlds} />;
}

export default Library;
