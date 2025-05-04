import type { SentenceType } from "@/entities/world/types/types";
import { Input } from "@/shared/input";
import { useState } from "react";

function AddNewSentenceRow({
	num,
	sentence: initialSentence,
	onDelete,
	onChange,
	readonly = false,
}: {
	readonly?: boolean;
	num: number;
	onDelete: () => void;
	onChange: (data: Partial<SentenceType>) => void;
} & SentenceType) {
	const [sentence, setSentence] = useState(initialSentence);

	console.log(initialSentence);

	const handleBlur = () => {
		if (sentence === "") {
			onDelete();
		}
	};

	const handleChange = (value: string) => {
		onChange({ sentence: value });
		setSentence(value);
	};

	return (
		<div className="bg-white h-fit flex justify-between rounded-[20px] px-[50px] py-[23px] items-center gap-10">
			<div className="font-bold text-3xl">{num}</div>
			<Input
				className=" w-full"
				value={sentence}
				onChange={(ev) => handleChange(ev.target.value)}
				placeholder="Предложение..."
				disabled={readonly}
				onBlur={handleBlur}
			/>
		</div>
	);
}

export default AddNewSentenceRow;
