import { Button } from "@/shared/button";
import { AnimatePresence, motion } from "motion/react";
import { useEditorStore } from "../model/world-editor-store";
import AddNewWordRow from "./components/AddNewRow";
function WordsEditor() {
	const { words, addWord, removeWord, updateWord } = useEditorStore();

	return (
		<motion.div className="flex w-full mt-4 flex-col gap-4">
			<AnimatePresence>
				{words.map((word, id) => (
					<motion.div
						key={word.id}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -100 }}
						transition={{ duration: 0.6 }}
					>
						<AddNewWordRow
							num={id + 1}
							onChange={(data) => updateWord(word.id, data)}
							onDelete={() => removeWord(word.id)}
							{...word}
							key={word.id}
							type="word"
						/>
					</motion.div>
				))}
			</AnimatePresence>

			<motion.div layout className=" w-fit self-center">
				<Button onClick={addWord}>Добавить</Button>
			</motion.div>
		</motion.div>
	);
}

export default WordsEditor;
