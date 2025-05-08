import type { WorldPreviewType } from "@/entities/world/types/types";
import Preloader from "@/shared/preloader/preloader";
import { useNavbarStore } from "@/widgets/navbar/model/navbarState";
import WorldsGrid from "@/widgets/worlds-grid";
import { useEffect, useState } from "react";
import { userWordsListRequest } from "../api/worlds-api";

function Profile() {
	const { setSelectedIndex } = useNavbarStore();
	const [worlds, setWorlds] = useState<WorldPreviewType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setSelectedIndex(0);

		userWordsListRequest().then((data) => {
			console.log(data);
			setWorlds(data);
			setLoading(false);
		});
	}, [setSelectedIndex]);

	return loading ? <Preloader /> : <WorldsGrid addBtn worlds={worlds} />;
}

export default Profile;
