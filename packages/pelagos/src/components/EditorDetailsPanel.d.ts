import type {FunctionComponent, ReactNode} from 'react';

interface EditorDetailsPanelProps {
	/** The component ID. */
	id?: string;
	/** The item to display, it must have at least two properties: id and name  */
	item: {id: string; name: string};
	/** Whether to show the buttons. */
	showButtons?: boolean;
	/** If set the edit button is disabled and this text displayed as tooltip. */
	disableEdit?: string;
	/** If set the delete button is disabled and this text displayed as tooltip. */
	disableDelete?: string;
	/** The panel content. */
	children: ReactNode;
	/** Function invoked when the close button is clicked. */
	onClose: () => void;
	/** Function invoked when the edit button is clicked. */
	onEdit?: ({id, name}: {id: string; name: string}) => void;
	/** Function invoked when the delete button is clicked. */
	onDelete?: ({id, name}: {id: string; name: string}) => void;
}

/**
 * Details panel for the edit table.
 * If a single child is provided a standard set of buttons will be added,
 * if two children are provided the second child should contain all required buttons.
 */
declare const EditorDetailsPanel: FunctionComponent<EditorDetailsPanelProps>;
export default EditorDetailsPanel;
