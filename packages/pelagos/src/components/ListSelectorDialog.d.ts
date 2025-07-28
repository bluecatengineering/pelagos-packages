import type {FunctionComponent, MouseEventHandler} from 'react';

interface ListSelectorDialogProps {
	/** The dialog title. */
	title: string;
	/** The URL to use in the help link, if specified a link will be added in the header. */
	helpHref?: string;
	/** The text to display when no items are selected. */
	emptyText?: string;
	/** The text to announce when all items are removed. */
	allItemsRemovedText: string;
	/** The text to display in the save button. */
	saveText: string;
	/** The current items. */
	items: string[];
	/** All items which can be selected. */
	allItems: string[];
	/** The default items. */
	defaultItems?: string[];
	/** Function returning the item label. */
	getLabel: (key: string) => string;
	/** Function invoked when the close button is clicked. */
	onClose: MouseEventHandler<HTMLButtonElement>;
	/** Function invoked when the save button is clicked. */
	onSave: (items: string[]) => void;
}

/** A dialog to select a subset of items from a list. */
declare const ListSelectorDialog: FunctionComponent<ListSelectorDialogProps>;
export default ListSelectorDialog;
