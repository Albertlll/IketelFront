import { Button } from "@/shared/button";
import AddNewWordRow from "./components/AddNewRow";
import { useEditorStore } from "./model/world-editor-store";
function WordsEditor() {
	const { words, addWord, removeWord, updateWord } = useEditorStore();

	return (
		<div className="flex w-full mt-4 flex-col gap-4">
			{words.map((word, id) => (
				<AddNewWordRow
					num={id + 1}
					onChange={(data) => updateWord(word.id, data)}
					onDelete={() => removeWord(word.id)}
					{...word}
					key={word.id}
					type="word"
				/>
			))}

			<Button onClick={addWord} className=" w-fit self-center">
				Добавить
			</Button>
		</div>
	);
}

export default WordsEditor;
