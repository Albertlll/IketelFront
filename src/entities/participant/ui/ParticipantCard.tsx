import type React from "react";

interface ParticipantCardProps {
	playerName: string;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ playerName }) => {
	return (
		<div className=" px-[20px] py-[10px] text-secondary rounded-[20px] bg-white text-2xl font-bold">
			{playerName}
		</div>
	);
};

export default ParticipantCard;
