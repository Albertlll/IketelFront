export interface WorldPreviewType {
	id: number;
	title: string;
	image: string;
}

export interface WordType {
	word: string;
	translation: string;
	id: string;
}

export interface WorldType {
	id: number;
	title: string;
	image: string;
	description: string;
	words: WordType[];
}
