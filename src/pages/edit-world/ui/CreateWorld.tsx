import { startAdventure } from "@/entities/adventure/api/adventure-api";
import { useNavbarStore } from "@/widgets/navbar/model/navbarState";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useEditorStore } from "../model/world-editor-store";
import CreateWorldHeader from "./CreateWorldHeader";
import SentencesEditor from "./SentencesEditor";
import WordsEditor from "./WordsEditor";

function WorldsEditor({ mode }: { mode: "read" | "create" }) {
	const { selectedIndex, setSelectedIndex } = useNavbarStore();

	const { id } = useParams<{ id: string }>();

	const [isWordsPage, setIsWordsPage] = useState<boolean>(true);

	const { loadWorldData, setEditorType, clearAll, setWorldId } =
		useEditorStore();

	useEffect(() => {
		console.log(id);
		setWorldId(Number(id));

		console.log(mode);
		setEditorType(mode);
		if (mode === "read") {
			loadWorldData(Number(id));
			setSelectedIndex(1);
		} else {
			clearAll();
			setSelectedIndex(0);
		}

		return () => clearAll();
	}, [
		setSelectedIndex,
		id,
		loadWorldData,
		mode,
		setEditorType,
		clearAll,
		setWorldId,
	]);

	return (
		// shadowDefault
		<div className=" box-border w-full ">
			<CreateWorldHeader
				isWordsPage={isWordsPage}
				setIsWordsPage={setIsWordsPage}
			/>

			{isWordsPage ? <WordsEditor /> : <SentencesEditor />}
		</div>
	);
}

export default WorldsEditor;
