import { Button } from "@/shared/ui/button";
import socketClass from "@/shared/api/sockets";
import { useNavigate } from "react-router";

type FinishEntry = {
	place: number;
	username: string;
	score: number;
};

const GameFinish = ({
	top3,
	totalPlayers,
}: {
	top3: FinishEntry[];
	totalPlayers: number;
}) => {
	const navigate = useNavigate();

	const handleExit = () => {
		socketClass.getInstance().disconnect();
		navigate("/my-worlds");
	};

	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="w-full max-w-[640px] bg-white rounded-[20px] p-6 sm:p-8 flex flex-col gap-4">
				<div className="text-2xl sm:text-3xl font-bold text-secondary">
					Игра завершена
				</div>
				<div className="text-sm sm:text-base text-primary">
					Участников: {totalPlayers}
				</div>

				<div className="flex flex-col gap-2">
					{top3.map((entry) => (
						<div
							key={`${entry.place}-${entry.username}`}
							className="flex items-center gap-3 bg-white rounded-[15px] p-3"
						>
							<div className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-primary text-white text-base">
								{entry.place}
							</div>
							<div className="flex-1 text-secondary text-lg font-semibold">
								{entry.username || "Без имени"}
							</div>
							<div className="text-primary text-base">{entry.score}</div>
						</div>
					))}
				</div>

				<div className="pt-2">
					<Button onClick={handleExit}>Выйти в мои миры</Button>
				</div>
			</div>
		</div>
	);
};

export default GameFinish;
