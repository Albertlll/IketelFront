export interface WorldPreviewType {
	id: number;
	title: string;
	image: string;
	is_public?: boolean;
	is_owner?: boolean;
}

export interface WordType {
	word: string;
	translation: string;
	id: string;
}

export interface SentenceType {
	id: string;
	sentence: string;
}

export interface WorldType {
	id: number;
	title: string;
	image: string;
	description: string;
	words: WordType[];
	sentences: SentenceType[];
	is_public?: boolean;
	is_owner?: boolean;
}
