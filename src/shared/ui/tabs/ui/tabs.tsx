import { cn } from "@/shared/lib/utils";
// import { useTabsModel } from "../model/tabs";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useState } from "react";

// Тут типы не очень хорошо сделаны, надо бы переписать потом будет

interface TabElement {
	element?: ReactNode;
	title: string;
}

interface TabsPropsBase {
	elements: Array<TabElement>;
	className?: string;
}

// Варианты пропсов через объединение типов
type TabsProps = TabsPropsBase &
	(
		| {
			// Режим с контентом (по умолчанию)
			isSwitchOnly?: false; // явно false
			selectedIndex?: never; // запрещаем эти пропсы
			onTabChange?: () => void;
			animated: boolean;
		}
		| {
			// Режим переключателя
			isSwitchOnly: true;
			selectedIndex: number;
			onTabChange: (index?: number) => void;
			animated: boolean;
		}
	);

function Tabs({
	elements,
	isSwitchOnly = false,
	selectedIndex = 0,
	animated = false,
	onTabChange,
}: TabsProps) {
	// const { selectedInd, setSelected } = useTabsModel();

	const [internalSelected, setInternalSelected] = useState(0);
	const selectedInd = isSwitchOnly ? selectedIndex : internalSelected;

	const handleChange = (index: number) => {
		if (isSwitchOnly) {
			onTabChange?.(index);
		} else {
			if (onTabChange) onTabChange();
			setInternalSelected(index);
		}
	};

	return (
		<>
			<div className="w-full sm:w-fit rounded-[20px] px-[10px] sm:px-[20px] text-[16px] sm:text-[18px] md:text-[20px] py-[8px] sm:py-[10px] font-medium bg-white flex gap-1 sm:gap-2 justify-center sm:justify-between">
				{elements.map((elem, ind) => (
					<div className="flex items-center gap-2" key={`tab-${elem.title}`}>
						<button
							type="button"
							onClick={() => handleChange(ind)}
							className={cn(
								" text-gray",
								ind === selectedInd && "text-primary",
							)}
						>
							{elem.title}
						</button>
						{ind !== elements.length - 1 && <div className=" text-gray">/</div>}
					</div>
				))}
			</div>

			{!isSwitchOnly && (

				animated ?
					<AnimatePresence mode="wait">
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
							key={`tab-content-${selectedInd}`}
						>
							{elements[selectedInd].element}
						</motion.div>
					</AnimatePresence>

					:

					<div>
						{elements[selectedInd].element}
					</div>

			)}
		</>
	);
}

export default Tabs;
