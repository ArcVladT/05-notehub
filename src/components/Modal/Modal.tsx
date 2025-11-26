import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import NoteForm from "../NoteForm/NoteForm";
import { useEffect, type SetStateAction } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type { NoteFormData } from "../../types/note";

interface ModalProps {
	closeModal: React.Dispatch<SetStateAction<boolean>>;
	postNote: UseMutationResult<AxiosResponse, Error, NoteFormData, unknown>;
}

const Modal = ({ closeModal, postNote }: ModalProps) => {
	useEffect(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal(false);
		};

		document.body.addEventListener("keydown", handleKeydown);
		document.body.style.overflow = "hidden";

		return () => {
			document.body.removeEventListener("keydown", handleKeydown);
			document.body.style.overflow = "";
		};
	});

	const handleCloseBack = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) closeModal(false);
	};

	const divRoot = document.getElementById("modal-root");

	if (!divRoot) return null;

	return createPortal(
		<div>
			<div
				onClick={handleCloseBack}
				className={css.backdrop}
				role="dialog"
				aria-modal="true"
			>
				<div className={css.modal}>
					<NoteForm closeModal={closeModal} postNote={postNote} />
				</div>
			</div>
		</div>,
		divRoot
	);
};

export default Modal;
