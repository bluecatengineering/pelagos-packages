import type {FunctionComponent, ReactNode} from 'react';

interface TableToolbarProps {
	/** The component class name(s). */
	className: string;
	/** The toolbar type. */
	type?: 'default' | 'sectioned';
	/** The child elements. */
	children?: ReactNode;
}

/**
 * Table toolbar container.
 * Default toolbars must contain an optional TableToolbarBatch and/or a TableToolbarDefault in that order.
 * Sectioned toolbars must contain one, two, or three TableToolbarSection.
 */
declare const TableToolbar: FunctionComponent<TableToolbarProps>;
export default TableToolbar;
