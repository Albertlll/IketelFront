import ParticipantCard from "@/entities/participant/ui/ParticipantCard";
import type React from "react";
import useParticipantsStore from "../model/participantsStore";

const ParticipantsList: React.FC = () => {
	const { participants } = useParticipantsStore();

	return (
		<ul className=" w-full h-fit flex flex-wrap items-center gap-2">
			{participants.map((participant) => (
				<li key={participant.id} className="w-fit h-fit">
					<ParticipantCard playerName={participant.name} />
				</li>
			))}
		</ul>
	);
};

export default ParticipantsList;
