import { create } from "zustand";

import type { Adventure } from "../types/adventureTypes";

import socket, { connectSocket } from "@/sockets";
import { startAdventure } from "../api/adventure-api";
import { type AdventureDTO, transformAdventureDTO } from "../schemas/dto";

type AdventureState = {
  // setAdventure: (adventure: Adventure) => void;
  loadAdventure: (worldId: number) => void;
} & Adventure;

const useAdventureStore = create<AdventureState>((set) => ({
  joinCode: "",
  stepsCount: 0,

  loadAdventure: async (worldId) => {
    const adventureDTO: AdventureDTO = await startAdventure(worldId);
    const adventure = transformAdventureDTO(adventureDTO);
    console.log(adventure);
    set({
      joinCode: adventure.joinCode,
      stepsCount: adventure.stepsCount,
    });

    // Тут запрос на соединение к сокету, создание хоста.
    connectSocket();
    socket.emit("host_join", {
      session_code: adventure.joinCode,
    });
  },
}));

export default useAdventureStore;
