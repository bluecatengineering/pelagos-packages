import type {ReactElement, ReactNode} from 'react';

interface ListEntriesProps<T> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The key of the highlighted row. */
	highlightKey?: string | null;
	/** The data for the list. */
	list: T[];
	/** Whether items are reorderable. */
	reorderable?: boolean | 'numbers';
	/** Whether items are listed as columns. Set to true if reorderable. */
	column?: boolean;
	/** Function invoked to get each item's key. */
	getItemKey: (item: T, index: number) => number | string;
	/** Function invoked to get each item's name. */
	getItemName: (item: T) => string;
	/** Function invoked to render each list item. */
	renderItem?: (item: T) => ReactNode;
	/** Function invoked when an item is reordered. */
	onReorder?: (list: T[]) => void;
	/** Function invoked when the remove button is clicked. */
	onRemoveClick: (item: T, index: number) => void;
	/** Function invoked to clear the highlight key. */
	onHighlightClear?: () => void;
}

/** A list of entries. */
declare const ListEntries: <T>(props: ListEntriesProps<T>) => ReactElement;
export default ListEntries;
