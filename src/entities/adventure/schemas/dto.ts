import type { Adventure } from "../types/types";

export interface AdventureDTO {
	join_code: string;
	steps_count: number;
}

export const transformAdventureDTO = (dto: AdventureDTO): Adventure => ({
	joinCode: dto.join_code,
	stepsCount: dto.steps_count,
});
