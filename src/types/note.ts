export interface Note {
	content: string;
	createdAt: string;
	id: string;
	tag: string;
	title: string;
	updatedAt: string;
}

export type FormTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface NoteFormData {
	title: string;
	content: string;
	tag: FormTag;
}

export interface NoteData {
	title: string;
	content: string;
	tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
	id: string;
}
