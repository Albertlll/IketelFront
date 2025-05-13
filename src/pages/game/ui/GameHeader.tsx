import useAdventureStore from "@/entities/adventure/model/adventureStore";
import socket from "@/sockets";

function GameHeader({ code }: { code: string }) {
  const { startGame, isStarted } = useAdventureStore();
  console.log(code);

  const handleStartGame = () => {
    startGame();
  };

  return (
    <>
      <div className="w-full py-[14px] px-[57px] bg-white rounded-[20px] gap-3 flex justify-between">
        <div className=" text-secondary font-bold text-4xl">Код игры</div>

        <div className=" text-primary font-bold text-4xl">{code}</div>
      </div>

      {!isStarted && (
        <button
          type="button"
          onClick={handleStartGame}
          className=" w-full py-[14px] px-[57px] bg-white rounded-[20px] text-primary font-bold text-4xl cursor-pointer"
        >
          начать игру
        </button>
      )}
    </>
  );
}

export default GameHeader;
