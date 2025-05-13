import useAdventureStore from "@/entities/adventure/model/adventureStore";
// import type { LeaderboardParticipant } from "@/features/leaderboard/model/leaderboardStore";
import LeaderboardList from "@/features/leaderboard/ui/ParticipantsList";
import type { Participant } from "@/features/participants/model/participantsStore";
import ParticipantsList from "@/features/participants/ui/ParticipantsList";
import { cn } from "@/lib/utils";
import Preloader from "@/shared/preloader/preloader";
import socket from "@/sockets";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router";
import GameHeader from "./GameHeader";

// const leaderboardData: LeaderboardParticipant[] = [
// 	{
// 		sid: "5f7d8g9h2k1l",
// 		username: "Алексей",
// 		score: 785,
// 	},
// 	{
// 		sid: "3a4b5c6d7e8f",
// 		username: "Мария",
// 		score: 680,
// 	},
// 	{
// 		sid: "1q2w3e4r5t6y",
// 		username: "Иван",
// 		score: 620,
// 	},
// 	{
// 		sid: "9z8x7c6v5b4n",
// 		username: "Екатерина",
// 		score: 540,
// 	},
// 	{
// 		sid: "2m3n4b5v6c7x",
// 		username: "Дмитрий",
// 		score: 495,
// 	},
// 	{
// 		sid: "4p5o6i7u8y9t",
// 		username: "Анна",
// 		score: 430,
// 	},
// 	{
// 		sid: "6r7t8y9u0i1o",
// 		username: "Сергей",
// 		score: 380,
// 	},
// 	{
// 		sid: "8k9l0j1h2g3f",
// 		username: "Ольга",
// 		score: 320,
// 	},
// 	{
// 		sid: "0d9s8f7g6h5j",
// 		username: "Никита",
// 		score: 275,
// 	},
// 	{
// 		sid: "7g6h5j4k3l2q",
// 		username: "Полина",
// 		score: 210,
// 	},
// ];
const Game = () => {
	const {
		joinCode,
		loadAdventure,
		isStarted,
		isLoading,
		error,
		leaderboardData,
	} = useAdventureStore();
	// const { worldId } = useEditorStore();
	const { worldId } = useParams();
	const [participants, setParticipants] = useState<Participant[]>([]);
	const numericWorldId = worldId ? Number.parseInt(worldId) : 0;
	useEffect(() => {
		loadAdventure(numericWorldId);

		socket.on("new_student_joined", (player) => {
			console.log("New player:", player);
			setParticipants((prev) => [
				...prev,
				{ name: player.username, id: player.sid },
			]);
		});

		socket.on("student_left", (player) => {
			console.log("Отключился:", player);
			setParticipants((prev) => prev.filter((item) => item.id !== player.sid));
		});

		socket.on("error", (msg) => {
			console.log(msg);
		});

		socket.on("", () => { });

		// Функция очистки, которая будет вызвана при размонтировании компонента
		return () => {
			console.log("Отключение сокета при выходе из игры");
			socket.off("new_student_joined");
			socket.off("student_left");
			socket.off("error");
			socket.off("");
			socket.off("leaderboard");
			socket.off("host_ready");

			// Отключаем сокет
			if (socket.connected) {
				socket.disconnect();
			}
		};
	}, [loadAdventure, numericWorldId]);
	return (
		<>
			{error ? (
				<div className="w-full h-full flex items-center justify-center">
					<div className="p-4 sm:p-6 w-[90%] sm:w-[300px] h-[80px] sm:h-[100px] flex justify-center items-center bg-white rounded-[15px] sm:rounded-[20px] text-primary text-sm sm:text-base">
						{error}
					</div>
				</div>
			) : isLoading ? (
				<Preloader />
			) : (
				<div
					className={cn(
						"w-full gap-2 sm:gap-3 grid grid-cols-1 md:grid-cols-[auto_400px]",
						isStarted && "flex flex-col",
					)}
				>
					<GameHeader code={joinCode} />

					{!isStarted ? (
						<>
							<ParticipantsList participants={participants} />

							<QRCode
								value={joinCode}
								className="p-[15px] sm:p-[25px] md:p-[35px] w-full h-full bg-white rounded-[15px] sm:rounded-[20px]"
								size={200}
							/>
						</>
					) : (
						<LeaderboardList participants={leaderboardData} />
					)}
				</div>
			)}
		</>
	);
};

export default Game;
