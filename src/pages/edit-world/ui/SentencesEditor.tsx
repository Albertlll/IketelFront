import { Button } from "@/shared/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useEditorStore } from "../model/world-editor-store";
import AddNewSentenceRow from "./components/AddNewSentenceRow";

function SentencesEditor() {
	const { sentences, addSentence, removeSentence, updateSentence, editorType } =
		useEditorStore();

	console.log(sentences);

	return (
		<motion.div className="flex w-full mt-4 flex-col gap-4">
			<AnimatePresence mode="popLayout">
				{sentences.map((sentence, id) => (
					<motion.div
						key={sentence.id}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -100 }}
						transition={{ duration: 0.6 }}
					>
						<AddNewSentenceRow
							readonly={editorType === "read"}
							num={id + 1}
							onChange={(data) => updateSentence(sentence.id, data)}
							onDelete={() => removeSentence(sentence.id)}
							{...sentence}
							key={sentence.id}
						/>
					</motion.div>
				))}
			</AnimatePresence>

			{editorType === "create" ||
				(editorType === "edit" && (
					<motion.div layout className="w-fit self-center">
						<Button onClick={addSentence}>Добавить</Button>
					</motion.div>
				))}
		</motion.div>
	);
}

export default SentencesEditor;
