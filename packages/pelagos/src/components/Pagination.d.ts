import type {FunctionComponent} from 'react';

interface PaginationProps {
	/** The component ID. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The current page number, starts from 1. */
	page: number;
	/** The current page size. */
	pageSize: number;
	/** The page size options. */
	pageSizes?: number[];
	/** The total number of items. */
	totalItems?: number;
	/** Function invoked when the page changes. */
	onPageChange: (page: number) => void;
	/** Function invoked when the page size changes. */
	onPageSizeChange: (pageSize: number) => void;
}

/** Component to perform pagination. */
declare const Pagination: FunctionComponent<PaginationProps>;
export default Pagination;
