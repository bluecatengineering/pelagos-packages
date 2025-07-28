import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface MultiColumnProps extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
	/** The component ID. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The selected path. */
	path: number[];
	/** The column width (css length). */
	colWidth?: string;
	/** The text to display when there is no data. */
	emptyText?: string;
	/** Function invoked to get the number of items for each column. */
	getItemCount: (index: number) => Promise<number> | number;
	/** Function invoked to check if an item is a leaf. */
	isLeaf: (itemPath: number[]) => boolean;
	/** Function invoked to render each list item. */
	renderItem: (itemPath: number[]) => ReactNode;
	/** Function invoked when the selection changes. */
	onChange: (itemPath: number[]) => void;
}

/** A component which presents a tree path as multiple columns. */
declare const MultiColumn: FunctionComponent<MultiColumnProps>;
export default MultiColumn;
