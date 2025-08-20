import type {FunctionComponent} from 'react';

interface ListSelectorProps {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The current items. */
	items: string[];
	/** All items which can be selected. */
	allItems: string[];
	/** The text to display when no items are selected. */
	emptyText?: string;
	/** The text to announce when all items are removed. */
	allItemsRemovedText?: string;
	/** Function returning the item label. */
	getLabel: (key: string) => string;
	/** Function invoked when the list changes. */
	onChange: (items: string[]) => void;
}

/** A component to select a subset of items from a list. */
declare const ListSelector: FunctionComponent<ListSelectorProps>;
export default ListSelector;
