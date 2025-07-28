import type {FunctionComponent, ReactNode} from 'react';

interface TableTitleProps {
	/** The title element id. */
	id?: string;
	/** The title. */
	title: ReactNode;
	/** The description. */
	description?: ReactNode;
}

/** Title for a table. */
declare const TableTitle: FunctionComponent<TableTitleProps>;
export default TableTitle;
