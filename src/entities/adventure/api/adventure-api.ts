import httpClient from "@/httpClient";

export const startAdventure = async (worldId: number) => {
	console.log(worldId);
	const response = await httpClient.post("/adventures/", { world_id: worldId });
	console.log(response.data);
	return response.data;
};
