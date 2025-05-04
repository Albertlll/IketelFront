import useAdventureStore from "@/entities/adventure/model/adventureStore";
import ParticipantsList from "@/features/participants/ui/ParticipantsList";
import { useEditorStore } from "@/pages/edit-world/model/world-editor-store";
import socket from "@/sockets";
import type React from "react";
import { useEffect } from "react";
import QRCode from "react-qr-code";
import GameHeader from "./GameHeader";
const Game: React.FC = () => {
	const { joinCode, loadAdventure } = useAdventureStore();
	const { worldId } = useEditorStore();

	useEffect(() => {
		loadAdventure(worldId);

		socket.on("player_joined", (player) => {
			console.log("New player:", player);
		});

		socket.on("error", (msg) => {
			console.log(msg);
		});
	}, [loadAdventure, worldId]);
	return (
		<div className="w-full gap-3 grid grid-cols-[auto_400px]">
			<GameHeader code={joinCode} />

			<ParticipantsList />

			<QRCode
				value={joinCode}
				className=" p-[35px] w-full h-full bg-white rounded-[20px]"
			/>
		</div>
	);
};

export default Game;
