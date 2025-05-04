import type { WordType } from "@/entities/world/types/types";
import { Input } from "@/shared/input";
import { useEffect, useState } from "react";

function AddNewWordRow({
	num,
	word: initialWord,
	translation: initialTranslation,
	onDelete,
	onChange,
	readonly = false,
}: {
	readonly?: boolean;
	num: number;
	onDelete: () => void;
	onChange: (data: Partial<WordType>) => void;
} & WordType) {
	const [word, setWord] = useState(initialWord);
	const [translation, setTranslation] = useState(initialTranslation);

	// Проверяем на пустые поля и удаляем при необходимости
	const handleBlur = () => {
		// Проверяем на пустые поля и удаляем при уходе фокуса
		if (word === "" && translation === "") {
			onDelete();
		}
	};

	const handleChange = (field: keyof WordType, value: string) => {
		const newData = { [field]: value };
		onChange(newData);

		if (field === "word") setWord(value);
		if (field === "translation") setTranslation(value);
	};

	return (
		<div className="bg-white h-fit flex justify-between rounded-[20px] px-[50px] py-[23px] items-center">
			<div className="font-bold text-3xl">{num}</div>
			<div className="flex gap-3">
				<Input
					disabled={readonly}
					placeholder="Сүз..."
					value={word}
					onChange={(e) => handleChange("word", e.target.value)}
					onBlur={handleBlur}
				/>
				<Input
					disabled={readonly}
					placeholder="Слово..."
					value={translation}
					onChange={(e) => handleChange("translation", e.target.value)}
					onBlur={handleBlur}
				/>
			</div>
		</div>
	);
}

export default AddNewWordRow;
