import { cn } from "@/lib/utils";
// import { useTabsModel } from "../model/tabs";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useState } from "react";

interface TabElement {
	element: ReactNode;
	title: string;
}

interface TabsProps {
	elements: Array<TabElement>;
	className?: string;
}
function Tabs({ elements }: TabsProps) {
	// const { selectedInd, setSelected } = useTabsModel();

	const [selectedInd, setSelected] = useState<number>(0);

	return (
		<>
			<div className=" w-fit rounded-[20px] px-[20px] text-[20px] py-[10px] font-medium bg-white flex gap-2  justify-between">
				{elements.map((elem, ind) => (
					<div className="flex items-center gap-2" key={`tab-${elem.title}`}>
						<button
							type="button"
							onClick={() => setSelected(ind)}
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
		</>
	);
}

export default Tabs;
