import LeaderbordParticipantCard from "@/entities/participant/ui/LeaderboardParticipantCard";
import type { LeaderboardParticipant } from "../model/leaderboardStore";

const LeaderboardList = ({
	participants,
}: { participants: LeaderboardParticipant[] }) => {
	// const { participants } = useParticipantsStore();

	return (
		<ul className=" w-full h-fit flex flex-wrap items-center gap-2">
			{participants.map((participant, id) => (
				<li key={participant.sid} className="w-full h-fit">
					<LeaderbordParticipantCard {...participant} place={id + 1} />
				</li>
			))}
		</ul>
	);
};

export default LeaderboardList;
