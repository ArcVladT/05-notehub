import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

interface NoteListProps {
	notesAr: Note[];
	deleteNote: UseMutationResult<AxiosResponse, Error, string, unknown>;
}

const NoteList = ({ notesAr, deleteNote }: NoteListProps) => {
	if (!notesAr) return;
	return (
		<>
			<ul className={css.list}>
				{notesAr.map((note) => (
					<li className={css.listItem} key={note.id}>
						<h2 className={css.title}>{note.title}</h2>
						<p className={css.content}>{note.content}</p>
						<div className={css.footer}>
							<span className={css.tag}>{note.tag}</span>
							<button
								onClick={() => deleteNote.mutate(note.id)}
								className={css.button}
							>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default NoteList;
