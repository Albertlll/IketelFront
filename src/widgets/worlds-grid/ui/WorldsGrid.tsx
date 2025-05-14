import WorldCard from "@/entities/world";
import type { WorldPreviewType } from "@/entities/world/types/types";
import { Button } from "@/shared/button";
import { Link } from "react-router";

function WorldsGrid({
	worlds,
	addBtn = false,
	onWorldDelete,
}: {
	worlds: WorldPreviewType[];
	addBtn?: boolean;
	onWorldDelete?: (worldId: number) => void;
}) {
	return (
		<div className="grid w-full gap-4 sm:gap-6 md:gap-8 lg:gap-x-18 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(clamp(280px,30%,400px),1fr))]">
			{addBtn && (
				<Link to={"/worlds/new"} className="w-full h-full">
					<Button
						variant="secondary"
						className="text-[30px] sm:text-[35px] md:text-[40px] h-full w-full text-white rounded-[15px] sm:rounded-[20px]"
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
					onDelete={onWorldDelete}
				/>
			))}
		</div>
	);
}

export default WorldsGrid;
