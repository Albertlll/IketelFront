import { Button } from "@/shared/button";
import { AnimatePresence, motion } from "motion/react";
import { useEditorStore } from "../model/world-editor-store";
import AddNewWordRow from "./components/AddNewWordRow";
function WordsEditor() {
	const { words, addWord, removeWord, updateWord, editorType } =
		useEditorStore();

	return (
		<motion.div className="flex w-full mt-4 flex-col gap-4">
			<AnimatePresence mode="popLayout">
				{words.map((word, id) => (
					<motion.div
						key={word.id}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -100 }}
						transition={{ duration: 0.6 }}
					>
						<AddNewWordRow
							readonly={editorType === "read"}
							num={id + 1}
							onChange={(data) => updateWord(word.id, data)}
							onDelete={() => removeWord(word.id)}
							{...word}
							key={word.id}
						/>
					</motion.div>
				))}
			</AnimatePresence>

			{editorType === "create" && (
				<motion.div layout className=" w-fit self-center">
					<Button onClick={addWord}>Добавить</Button>
				</motion.div>
			)}
		</motion.div>
	);
}

export default WordsEditor;
