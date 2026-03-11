export interface Adventure {
	joinCode: string;
	stepsCount: number;
}

export interface StudyGameTask {
	title: string;
	variants: string[];
	answer: number;
	state?: number;
}

export interface StudyGameBlock {
	replika: string;
	image_url?: string | null;
	tasks: StudyGameTask[];
}
