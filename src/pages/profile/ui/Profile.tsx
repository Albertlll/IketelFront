import type { WorldPreviewType } from "@/entities/world/types/types";
import { useNavbarStore } from "@/widgets/navbar/model/navbarState";
import WorldsGrid from "@/widgets/worlds-grid";
import { useEffect } from "react";

function Profile() {
	const { setSelectedIndex } = useNavbarStore();

	useEffect(() => {
		setSelectedIndex(0);
	}, [setSelectedIndex]);

	const worlds: WorldPreviewType[] = [{ id: 0, title: "лмьавлмв", image: "" }];
	return <WorldsGrid addBtn worlds={worlds} />;
}

export default Profile;
