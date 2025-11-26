import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
	totalPages: number;
	onChangePage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ totalPages, onChangePage }: PaginationProps) => {
	if (!totalPages) return;
	return (
		<div>
			<ReactPaginate
				breakLabel="..."
				nextLabel="⇒"
				onPageChange={({ selected }) => onChangePage(selected + 1)}
				pageRangeDisplayed={5}
				marginPagesDisplayed={1}
				pageCount={totalPages}
				previousLabel="⇐"
				renderOnZeroPageCount={null}
				containerClassName={css.pagination}
				activeClassName={css.active}
			/>
		</div>
	);
};

export default Pagination;
