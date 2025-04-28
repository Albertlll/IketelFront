import { useState } from "react";
import { Link } from "react-router";
import arrow from "./img/arrow.svg";
function WorldCard({
	worldId,
	imgUrl,
	title,
}: { worldId: number; title: string; imgUrl: string }) {
	const [imageError, setImageError] = useState(!imgUrl);

	return (
		<Link to={`/worlds/${worldId}`}>
			<div className=" flex flex-col overflow-hidden rounded-[20px] w-full h-full border-4 border-white bg-white transition-colors duration-200 hover:border-primary">
				{/* <img src={imgUrl} alt="" className=" h-full object-cover" /> */}

				<div className="flex-grow overflow-hidden">
					{imageError ? (
						<div className="w-full h-full aspect-video bg-gray-200 flex items-center justify-center">
							<span className="text-gray-500">Изображение не загружено</span>
						</div>
					) : (
						<img
							src={imgUrl}
							alt={title}
							className="w-full h-full object-cover"
							onError={() => {
								setImageError(true);
								console.log(124);
							}}
						/>
					)}
				</div>

				<div className="w-full h-fit flex gap-3 justify-between px-8 py-2">
					<div className="w-full truncate text-lg">
						{title || "Без названия"}
					</div>
					<button type="button">
						<img src={arrow} alt="" />
					</button>
				</div>
			</div>
		</Link>
	);
}

export default WorldCard;
