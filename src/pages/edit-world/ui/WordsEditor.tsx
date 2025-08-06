import { Button } from "@/shared/ui/button";
import { AnimatePresence, motion, delay } from "motion/react";
import { useEditorStore } from "../model/world-editor-store";
import AddNewWordRow from "./components/AddNewWordRow";
import { useEffect, useRef } from "react";
function WordsEditor() {
	const { words, addWord, removeWord, updateWord, editorType } =
		useEditorStore();



	const isInitialRender = useRef<boolean>(true);

	useEffect(() => {

		const firstRenderTimeout = delay(() => {
			isInitialRender.current = false;
		}, (words.length * 0.1 + 0.2) * 1000)
		return () => firstRenderTimeout();
	}, [])



	const itemVariants = {
		hidden: { opacity: 0, x: -100 },
		visible: (data: { id: number, withDelay: boolean }) => ({
			opacity: 1,
			x: 0,
			transition: {
				delay: data.withDelay ? data.id * 0.1 : 0,
				duration: 0.5,
				ease: "easeOut"
			}
		}),
		exit: {
			opacity: 0,
			x: -100,
			transition: { duration: 0.3 }
		}
	};



	const buttonVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delay: isInitialRender.current ? words.length * 0.1 + 0.2 : 0
			}
		}
	}



	return (
		<motion.div className="flex w-full mt-4 flex-col gap-4">
			<AnimatePresence mode="popLayout">
				{words.map((word, id) => (
					<motion.div
						key={word.id}
						// initial={{ opacity: 0, x: -20 }}
						// animate={{ opacity: 1, x: 0 }}
						// exit={{ opacity: 0, x: -100 }}

						custom={{ id, withDelay: isInitialRender.current }}

						initial="hidden"
						animate="visible"
						exit="exit"


						// transition={{ duration: 0.6 }}
						variants={itemVariants}
						layout
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

			{(editorType === "create" || editorType === "edit") && (
				<AnimatePresence>

					<motion.div
						layout
						className=" w-fit self-center"
						initial="hidden"
						animate="visible"

						variants={buttonVariants}
					>
						<Button onClick={addWord}>Добавить</Button>
					</motion.div>
				</AnimatePresence>

			)}
		</motion.div>
	);
}

export default WordsEditor;
