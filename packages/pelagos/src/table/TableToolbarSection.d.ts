import type {FunctionComponent, ReactNode} from 'react';

interface TableToolbarSectionProps {
	/** The component class name(s). */
	className?: string;
	/** The toolbar type, defaults to 'start'. */
	area?: 'start' | 'middle' | 'end';
	/** The child elements. */
	children: ReactNode;
}

/** Table toolbar section. */
declare const TableToolbarSection: FunctionComponent<TableToolbarSectionProps>;
export default TableToolbarSection;
