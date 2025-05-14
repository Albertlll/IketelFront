import { deleteWorldRequest } from "@/entities/world/api/world-api";
import { useToast } from "@/shared/toast/hooks/hooks";
import { useState } from "react";
import { Link } from "react-router";
import arrow from "./img/arrow.svg";

function WorldCard({
	worldId,
	imgUrl,
	title,
	onDelete,
}: {
	worldId: number;
	title: string;
	imgUrl: string;
	onDelete?: (worldId: number) => void;
}) {
	const [imageError, setImageError] = useState(!imgUrl);
	const { showSuccess, showError } = useToast();

	const handleDelete = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (window.confirm(`Вы уверены, что хотите удалить мир "${title}"?`)) {
			try {
				await deleteWorldRequest(worldId);
				showSuccess("Мир успешно удален");
				if (onDelete) {
					onDelete(worldId);
				}
			} catch (error) {
				console.error("Ошибка при удалении мира:", error);
				showError("Не удалось удалить мир");
			}
		}
	};

	return (
		<Link to={`/worlds/${worldId}`}>
			<div className="flex flex-col overflow-hidden rounded-[15px] sm:rounded-[20px] w-full h-full border-2 sm:border-3 md:border-4 border-white bg-white transition-colors duration-200 hover:border-primary">
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
							className="w-full h-full object-cover aspect-video"
							onError={() => {
								setImageError(true);
								console.log(124);
							}}
						/>
					)}
				</div>

				<div className="w-full h-fit flex gap-2 sm:gap-3 justify-between px-4 sm:px-6 md:px-8 py-2">
					<div className="w-full truncate text-base sm:text-lg">
						{title || "Без названия"}
					</div>
					<div className="flex gap-2">
						{onDelete && (
							<button
								type="button"
								className="text-red-500 hover:text-red-700 font-bold"
								onClick={handleDelete}
								title="Удалить мир"
							>
								✕
							</button>
						)}
						<button type="button">
							<img src={arrow} alt="" />
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default WorldCard;
