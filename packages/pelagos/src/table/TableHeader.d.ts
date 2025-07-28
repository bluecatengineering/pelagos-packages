import type {CSSProperties, FunctionComponent, HTMLProps, ReactNode} from 'react';

interface TableHeaderProps extends HTMLProps<HTMLTableHeaderCellElement> {
	/** The component class name(s). */
	className?: string;
	/** The column width in pixels. Required if `onResize` is set. If not specified the width can be set by other means or left as auto. */
	width?: number;
	/** The alignment for text in the cell. */
	align?: 'left' | 'center' | 'right';
	/** Whether the table can be sorted by this column. */
	sortable?: boolean;
	/** The current sort order for this column. */
	sortOrder?: 'a' | 'd';
	/** Whether this header is for a radio selection column. */
	radio?: boolean;
	/** CSS styles. */
	style?: CSSProperties;
	/** The child elements. */
	children?: ReactNode;
	/** Function invoked when the column is resized. If specified the column becomes resizable. */
	onResize?: (width: number, header: HTMLTableHeaderCellElement) => void;
}

/** Header element for a table component. */
declare const TableHeader: FunctionComponent<TableHeaderProps>;
export default TableHeader;
