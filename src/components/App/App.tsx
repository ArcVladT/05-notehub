import {
	useQueryClient,
	useMutation,
	useQuery,
	keepPreviousData,
} from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import type { NoteData, NoteFormData } from "../../types/note";

// interface QueryRespondNote {
// 	notes: NoteData[];
// }

function App() {
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [modalOpen, setModalOpen] = useState(false);
	const [totalPages, setTotalPages] = useState(0);

	const handleInput = useDebouncedCallback(setQuery, 300);

	const { data } = useQuery({
		queryKey: ["notes", query, page],
		queryFn: async () => {
			const res = await fetchNotes(page, query);
			setTotalPages(res.totalPages);

			return res.notes;
		},
		placeholderData: keepPreviousData,
	});

	const qClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: (id: string) => deleteNote(id),
		onSuccess(data) {
			qClient.setQueryData<NoteData[]>(["notes", query, page], (prevNotes) => {
				if (!prevNotes) {
					return [];
				}

				return prevNotes.filter((note) => note.id !== data.id);
			});
		},
	});

	const postMutation = useMutation({
		mutationFn: (noteData: NoteFormData) => createNote(noteData),
		onSuccess(data) {
			qClient.setQueryData<NoteData[]>(["notes", query, page], (prevNotes) => {
				if (!prevNotes) {
					return [];
				}

				return [data, ...prevNotes];
			});
		},
	});

	return (
		<>
			<div className={css.app}>
				<header className={css.toolbar}>
					<SearchBox onUpdate={handleInput} />
					<Pagination totalPages={totalPages} onChangePage={setPage} />
					<button onClick={() => setModalOpen(true)} className={css.button}>
						Create note +
					</button>
				</header>
				<NoteList notesAr={data} deleteNote={deleteMutation} />
				{modalOpen && (
					<Modal closeModal={setModalOpen} postNote={postMutation} />
				)}
			</div>
		</>
	);
}

export default App;
