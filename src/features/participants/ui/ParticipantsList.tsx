import ParticipantCard from "@/entities/participant/ui/ParticipantCard";
import type { Participant } from "../model/participantsStore";

const ParticipantsList = ({
	participants,
}: { participants: Participant[] }) => {
	// const { participants } = useParticipantsStore();

	return (
		<ul className="w-full h-fit flex flex-wrap items-center gap-1 sm:gap-2 md:gap-3 p-2 sm:p-3 md:p-4 bg-white rounded-[15px] sm:rounded-[20px]">
			{participants.map((participant) => (
				<li key={participant.id} className="w-fit h-fit mb-1 sm:mb-2">
					<ParticipantCard playerName={participant.name} />
				</li>
			))}
			{participants.length === 0 && (
				<li className="w-full text-center text-secondary text-base sm:text-lg md:text-xl p-2 sm:p-3">
					Ожидание участников...
				</li>
			)}
		</ul>
	);
};

export default ParticipantsList;
