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
  return (
    <div className=" w-full grid gap-2 grid-cols-[340px_auto] ">
      <div className=" flex gap-2 w-full">
        <div className="px-[20px] bg-white items-center justify-center flex py-[10px] text-primary rounded-[20px]">
          {place}
        </div>

        <div className=" px-[20px] py-[10px] text-secondary rounded-[20px] bg-white text-2xl font-bold">
          {username}
        </div>
        <div className="px-[20px] py-[10px]  bg-white items-center justify-center flex text-primary rounded-[20px]">
          {score}
        </div>
      </div>

      <ProgressBar max={100} value={50} />
    </div>
  );
};

export default LeaderbordParticipantCard;
