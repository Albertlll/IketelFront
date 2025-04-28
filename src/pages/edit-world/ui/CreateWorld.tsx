import { useNavbarStore } from "@/widgets/navbar/model/navbarState";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import CreateWorldHeader from "./CreateWorldHeader";
import SentencesEditor from "./SentencesEditor";
import WordsEditor from "./WordsEditor";

function WorldsEditor() {
	const { selectedIndex, setSelectedIndex } = useNavbarStore();

	const [isWordsPage, setIsWordsPage] = useState<boolean>(true);

	useEffect(() => {
		setSelectedIndex(0);
	}, [setSelectedIndex]);

	return (
		<div className=" box-border w-full shadowDefault ">
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
