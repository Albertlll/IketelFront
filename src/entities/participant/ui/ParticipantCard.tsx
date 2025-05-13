import type React from "react";

interface ParticipantCardProps {
	playerName: string;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ playerName }) => {
	return (
		<div className="px-[10px] sm:px-[15px] md:px-[20px] py-[8px] sm:py-[10px] text-secondary rounded-[15px] sm:rounded-[20px] bg-white text-lg sm:text-xl md:text-2xl font-bold">
			{playerName}
		</div>
	);
};

export default ParticipantCard;
