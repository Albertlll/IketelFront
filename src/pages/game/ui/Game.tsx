import useAdventureStore from "@/entities/adventure/model/adventureStore";
import type { Participant } from "@/features/participants/model/participantsStore";
import ParticipantsList from "@/features/participants/ui/ParticipantsList";
import { useEditorStore } from "@/pages/edit-world/model/world-editor-store";
import socket from "@/sockets";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import GameHeader from "./GameHeader";
const Game = () => {
	const { joinCode, loadAdventure } = useAdventureStore();
	const { worldId } = useEditorStore();
	// const { addParticipant } = useParticipantsStore();

	const [participants, setParticipants] = useState<Participant[]>([]);

	useEffect(() => {
		loadAdventure(worldId);

		socket.on("new_student_joined", (player) => {
			console.log("New player:", player);
			setParticipants((prev) => [
				...prev,
				{ name: player.username, id: player.sid },
			]);
		});

		socket.on("student_left", (player) => {
			setParticipants((prev) => prev.filter((item) => item.id !== player.sid));
		});

		socket.on("error", (msg) => {
			console.log(msg);
		});
	}, [loadAdventure, worldId]);
	return (
		<div className="w-full gap-3 grid grid-cols-[auto_400px]">
			<GameHeader code={joinCode} />

			<ParticipantsList participants={participants} />

			<QRCode
				value={joinCode}
				className=" p-[35px] w-full h-full bg-white rounded-[20px]"
			/>
		</div>
	);
};

export default Game;
