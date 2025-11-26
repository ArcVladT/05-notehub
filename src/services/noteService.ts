import axios from "axios";
import type { NoteFormData } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(page: number, query?: string) {
	const res = await axios.get("", {
		params: {
			search: query,
			page: page,
			perPage: 12,
		},
		headers: {
			Authorization: `Bearer ${myKey}`,
		},
	});

	return res.data;
}

export async function deleteNote(id: string) {
	const res = await axios.delete(`/${id}`, {
		headers: {
			Authorization: `Bearer ${myKey}`,
		},
	});

	return res.data;
}

export async function createNote({ title, content, tag }: NoteFormData) {
	const res = await axios.post(
		"",
		{
			title: title,
			content: content,
			tag: tag,
		},
		{
			headers: {
				Authorization: `Bearer ${myKey}`,
			},
		}
	);

	return res.data;
}
