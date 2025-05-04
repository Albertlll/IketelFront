import { Input } from "@/shared/input";
import Tabs from "@/widgets/tabs";
import { useNavigate } from "react-router";
import { useEditorStore } from "../model/world-editor-store";
import ControlBtns from "./components/ControlBtns";

function CreateWorldHeader({
	isWordsPage,
	setIsWordsPage,
}: { isWordsPage: boolean; setIsWordsPage: (index: boolean) => void }) {
	const { worldTitle, editorType, setWorldTitle, sendWorldData } =
		useEditorStore();

	const publish = () => {};
	const download = () => {};

	const navigate = useNavigate();

	const play = async () => {
		try {
			navigate("/game");
		} catch (error) {
			console.error("Failed to start adventure:", error);
		}
	};

	publish;
	return (
		<div className=" flex gap-4 flex-col">
			<Input
				onChange={(e) => {
					setWorldTitle(e.target.value);
				}}
				placeholder="Название мирка"
				disabled={editorType === "read"}
				value={worldTitle}
				className="w-80"
			/>
			<div className=" bg-white h-fit flex justify-between rounded-[20px] px-[17px] py-[23px]">
				<Tabs
					isSwitchOnly={true}
					elements={[{ title: "Слова" }, { title: "Предложения" }]}
					selectedIndex={Number(!isWordsPage)}
					onTabChange={(index: number) => setIsWordsPage(!index)}
				/>

				<ControlBtns
					mode={editorType}
					publishHandler={publish}
					saveHandler={sendWorldData}
					playHandler={play}
					downloadHandler={download}
				/>
			</div>
		</div>
	);
}

export default CreateWorldHeader;
