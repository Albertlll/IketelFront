import Tabs from "@/widgets/tabs";
import { useState } from "react";
import ControlBtns from "./components/ControlBtns";

function CreateWorldHeader({
	isWordsPage,
	setIsWordsPage,
}: { isWordsPage: boolean; setIsWordsPage: (index: boolean) => void }) {
	return (
		<div className=" bg-white h-fit flex justify-between rounded-[20px] px-[17px] py-[23px]">
			<Tabs
				isSwitchOnly={true}
				elements={[{ title: "Слова" }, { title: "Предложения" }]}
				selectedIndex={Number(!isWordsPage)}
				onTabChange={(index: number) => setIsWordsPage(!index)}
			/>

			<ControlBtns />
		</div>
	);
}

export default CreateWorldHeader;
