import { useNavbarStore } from "@/widgets/navbar/model/navbarState";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useEditorStore } from "../model/world-editor-store";
import CreateWorldHeader from "./CreateWorldHeader";
import SentencesEditor from "./SentencesEditor";
import WordsEditor from "./WordsEditor";

function WorldsEditor({ mode }: { mode: "read" | "create" }) {
	const { selectedIndex, setSelectedIndex } = useNavbarStore();

	const { id } = useParams<{ id: string }>();

	const [isWordsPage, setIsWordsPage] = useState<boolean>(true);

	const { loadWorldData } = useEditorStore();

	useEffect(() => {
		console.log(id);
		setSelectedIndex(0);
		if (mode === "read") loadWorldData(Number(id));
	}, [setSelectedIndex, id, loadWorldData, mode]);

	return (
		// shadowDefault
		<div className=" box-border w-full ">
			<CreateWorldHeader
				isWordsPage={isWordsPage}
				setIsWordsPage={setIsWordsPage}
			/>

			<AnimatePresence mode="wait">
				<motion.div
					key={isWordsPage ? "words" : "sentences"}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
				>
					{isWordsPage ? <WordsEditor /> : <SentencesEditor />}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}

export default WorldsEditor;
