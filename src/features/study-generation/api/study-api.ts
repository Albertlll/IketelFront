import type { StudyGameBlock } from "@/entities/adventure/types/adventureTypes";
import type { ResponseWrapper } from "@/shared/lib/responseWrapper";
import httpClient from "@/shared/api/httpClient";

export interface StudyGeneratePayload {
	prompt: string;
	blocks_count: number;
	quiz_count: number;
}

interface StudyGenerateData {
	game: StudyGameBlock[];
}

export const generateStudyGame = async (
	worldId: number,
	payload: StudyGeneratePayload,
): Promise<StudyGenerateData> => {
	const response = await httpClient.post<ResponseWrapper<StudyGenerateData>>(
		`/worlds/${worldId}/study/generate`,
		payload,
	);
	return response.data.data;
};
