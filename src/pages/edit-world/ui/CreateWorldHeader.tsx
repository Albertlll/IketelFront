import { Input } from "@/shared/ui/input";
import Tabs from "@/shared/ui/tabs";
import { useNavigate } from "react-router";
import { useEditorStore } from "../model/world-editor-store";
import ControlBtns from "./components/ControlBtns";
import {
	StudyGenerationModal,
	generateStudyGame,
	type StudyGeneratePayload,
} from "@/features/study-generation";
import { useState } from "react";
import { useToast } from "@/shared/ui/toast/hooks/hooks";

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
		worldImage,
	} = useEditorStore();

	const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
	const { showError } = useToast();

	const publish = () => { };
	const download = () => {
		const { worldId, worldTitle, worldImage, words, sentences } =
			useEditorStore.getState();

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

		const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
			type: "application/json",
		});

		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${worldTitle || "world"}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const navigate = useNavigate();

	const play = async () => {
		try {
			navigate(`/game/${worldId}`);
		} catch {
			// no-op
		}
	};

	const openStudyModal = () => {
		if (!worldId) {
			showError("Сначала сохраните мирок, чтобы запускать изучение");
			return;
		}
		setIsStudyModalOpen(true);
	};

	const handleStudyStart = async (payload: StudyGeneratePayload) => {
		if (!worldId) {
			showError("Не удалось определить мирок");
			return;
		}

		try {
			const generated = await generateStudyGame(worldId, payload);
			setIsStudyModalOpen(false);
			navigate(`/study/${worldId}`, {
				state: {
					game: generated.game,
					worldImage,
				},
			});
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "Не удалось сгенерировать игру";
			showError(message);
			throw error;
		}
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
					animated
					isSwitchOnly={true}
					elements={[{ title: "Слова" }, { title: "Предложения" }]}
					selectedIndex={Number(!isWordsPage)}
					onTabChange={(index?: number) =>
						setIsWordsPage(index !== undefined ? !index : false)
					}
				/>

				<div className="flex justify-center sm:justify-end">
					<ControlBtns
						mode={editorType}
						publishHandler={publish}
						saveHandler={sendWorldData}
						playHandler={play}
						downloadHandler={download}
						studyHandler={openStudyModal}
						isStudyDisabled={editorType === "create" || !worldId}
					/>
				</div>
			</div>

			<StudyGenerationModal
				open={isStudyModalOpen}
				onClose={() => setIsStudyModalOpen(false)}
				onStart={handleStudyStart}
			/>
		</div>
	);
}

export default CreateWorldHeader;
