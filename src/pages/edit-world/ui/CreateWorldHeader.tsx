import { Input } from "@/shared/ui/input";
import Tabs from "@/widgets/tabs";
import { useNavigate } from "react-router";
import { useEditorStore } from "../model/world-editor-store";
import ControlBtns from "./components/ControlBtns";

function CreateWorldHeader({
	isWordsPage,
	setIsWordsPage,
}: { isWordsPage: boolean; setIsWordsPage: (index: boolean) => void }) {
	const {
		worldTitle,
		editorType,
		setWorldTitle,
		sendWorldData,
		setWorldImage,
		worldId,
	} = useEditorStore();

	const publish = () => {};
	const download = () => {
		// Получаем текущее состояние хранилища
		const { worldId, worldTitle, worldImage, words, sentences } =
			useEditorStore.getState();

		// Формируем JSON объект в нужном формате
		const jsonData = {
			id: worldId,
			title: worldTitle,
			image: worldImage || "",
			description: "",
			words: words.map((word, index) => ({
				id: Number(word.id) || index + 1,
				word: word.word,
				translation: word.translation,
				world_id: worldId,
			})),
			sentences: sentences.map((sentence, index) => ({
				id: Number(sentence.id) || index + 1,
				sentence: sentence.sentence,
				world_id: worldId,
			})),
			is_public: true,
		};

		// Создаем Blob с JSON данными
		const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
			type: "application/json",
		});

		// Создаем URL для Blob
		const url = URL.createObjectURL(blob);

		// Создаем временный элемент <a> для скачивания файла
		const a = document.createElement("a");
		a.href = url;
		a.download = `${worldTitle || "world"}.json`;

		// Добавляем элемент в DOM, имитируем клик и удаляем элемент
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		// Освобождаем URL
		URL.revokeObjectURL(url);
	};

	const navigate = useNavigate();

	const play = async () => {
		try {
			navigate(`/game/${worldId}`);
		} catch (error) {}
	};

	return (
		<div className="flex gap-3 sm:gap-4 flex-col">
			<div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between">
				<Input
					onChange={(e) => {
						setWorldTitle(e.target.value);
					}}
					placeholder="Название мирка"
					disabled={editorType === "read"}
					value={worldTitle}
					className="w-full sm:w-80"
				/>

				<Input
					disabled={editorType === "read"}
					type="file"
					onImageLoad={(base64) => setWorldImage(base64)}
					className="w-full sm:w-80"
				/>
			</div>

			<div className="bg-white h-fit flex flex-col sm:flex-row gap-4 sm:gap-2 sm:justify-between rounded-[15px] sm:rounded-[20px] px-[10px] sm:px-[17px] py-[15px] sm:py-[23px]">
				<Tabs
					isSwitchOnly={true}
					elements={[{ title: "Слова" }, { title: "Предложения" }]}
					selectedIndex={Number(!isWordsPage)}
					onTabChange={(index: number) => setIsWordsPage(!index)}
				/>

				<div className="flex justify-center sm:justify-end">
					<ControlBtns
						mode={editorType}
						publishHandler={publish}
						saveHandler={sendWorldData}
						playHandler={play}
						downloadHandler={download}
					/>
				</div>
			</div>
		</div>
	);
}

export default CreateWorldHeader;
