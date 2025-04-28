import WorldCard from "@/entities/world";
import type { WorldPreviewType } from "@/entities/world/types/types";
import { Button } from "@/shared/button";
import { Link } from "react-router";

function WorldsGrid({
	worlds,
	addBtn = false,
}: { worlds: WorldPreviewType[]; addBtn?: boolean }) {
	return (
		<div className="grid w-ful gap-x-18 gap-y-10 grid-cols-[repeat(auto-fill,minmax(clamp(280px,30%,400px),1fr))]">
			{addBtn && (
				<Link to={"/worlds/new"} className="w-full h-full">
					<Button
						variant="secondary"
						className=" text-[40px] h-full w-full text-white rounded-[20px]"
					>
						+
					</Button>
				</Link>
			)}

			{worlds.map((world) => (
				<WorldCard
					imgUrl={world.image}
					key={world.id}
					worldId={world.id}
					title={world.title}
				/>
			))}
		</div>
	);
}

export default WorldsGrid;
