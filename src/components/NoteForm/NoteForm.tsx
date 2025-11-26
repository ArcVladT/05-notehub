import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import type { SetStateAction } from "react";
import * as Yup from "yup";
import type { NoteFormData } from "../../types/note";

import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

interface NoteFormProps {
	closeModal: React.Dispatch<SetStateAction<boolean>>;
	postNote: UseMutationResult<AxiosResponse, Error, NoteFormData, unknown>;
}

const NoteForm = ({ closeModal, postNote }: NoteFormProps) => {
	const submitForm = (
		values: NoteFormData,
		formAction: FormikHelpers<NoteFormData>
	) => {
		postNote.mutate(values);
		formAction.resetForm();
		closeModal(false);
	};

	const valiSchema = Yup.object({
		title: Yup.string()
			.min(3, "At least 3 characters")
			.max(50, "Maximum 50")
			.required("Title is required"),
		content: Yup.string().max(500, "Maximum 500"),
	});

	return (
		<div>
			<Formik
				initialValues={{
					title: "",
					content: "",
					tag: "Todo",
				}}
				onSubmit={submitForm}
				validationSchema={valiSchema}
			>
				<Form className={css.form}>
					<div className={css.formGroup}>
						<label htmlFor="title">Title</label>
						<Field id="title" type="text" name="title" className={css.input} />
						<ErrorMessage component="span" name="title" className={css.error} />
					</div>

					<div className={css.formGroup}>
						<label htmlFor="content">Content</label>
						<Field
							as="textarea"
							id="content"
							name="content"
							rows={8}
							className={css.textarea}
						/>
						<ErrorMessage
							component="span"
							name="content"
							className={css.error}
						/>
					</div>

					<div className={css.formGroup}>
						<label htmlFor="tag">Tag</label>
						<Field as="select" id="tag" name="tag" className={css.select}>
							<option value="Todo">Todo</option>
							<option value="Work">Work</option>
							<option value="Personal">Personal</option>
							<option value="Meeting">Meeting</option>
							<option value="Shopping">Shopping</option>
						</Field>
						<ErrorMessage component="span" name="tag" className={css.error} />
					</div>

					<div className={css.actions}>
						<button
							onClick={() => closeModal(false)}
							type="button"
							className={css.cancelButton}
						>
							Cancel
						</button>
						<button type="submit" className={css.submitButton} disabled={false}>
							Create note
						</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default NoteForm;
