import css from "./SearchBox.module.css";
import type { DebouncedState } from "use-debounce";
import type { ChangeEvent } from "react";

interface SearchBoxProps {
	onUpdate: DebouncedState<React.Dispatch<React.SetStateAction<string>>>;
}

const SearchBox = ({ onUpdate }: SearchBoxProps) => {
	const handleInputValue = (input: ChangeEvent<HTMLInputElement>) => {
		onUpdate(input.target.value);
	};

	return (
		<div>
			<input
				onChange={handleInputValue}
				className={css.input}
				type="text"
				placeholder="Search notes"
			/>
		</div>
	);
};

export default SearchBox;
