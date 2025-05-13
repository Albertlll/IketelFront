import { ProgressBar } from "@/shared/progress-bar";

interface ParticipantCardProps {
	username: string;
	sid: string;
	score: number;
}

const LeaderbordParticipantCard = ({
	username,
	score,
	sid,
	place,
}: ParticipantCardProps & { place: number }) => {
	console.log(sid);
	return (
		<div className="w-full grid gap-2 grid-cols-1 sm:grid-cols-[auto_auto] md:grid-cols-[340px_auto]">
			<div className="flex gap-1 sm:gap-2 w-full flex-wrap">
				<div className="px-[10px] sm:px-[15px] md:px-[20px] bg-white items-center justify-center flex py-[8px] sm:py-[10px] text-primary rounded-[15px] sm:rounded-[20px] text-base sm:text-lg">
					{place}
				</div>

				<div className="px-[10px] sm:px-[15px] md:px-[20px] py-[8px] sm:py-[10px] text-secondary rounded-[15px] sm:rounded-[20px] bg-white text-lg sm:text-xl md:text-2xl font-bold flex-grow sm:flex-grow-0">
					{username}
				</div>
				<div className="px-[10px] sm:px-[15px] md:px-[20px] py-[8px] sm:py-[10px] bg-white items-center justify-center flex text-primary rounded-[15px] sm:rounded-[20px] text-base sm:text-lg">
					{score}
				</div>
			</div>

			<ProgressBar max={100} value={50} />
		</div>
	);
};

export default LeaderbordParticipantCard;
