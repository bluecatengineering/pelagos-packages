import type {FunctionComponent, HTMLProps, MouseEventHandler, ReactNode} from 'react';

interface FilterEditorProps extends HTMLProps<HTMLDivElement> {
	/** The component id. */
	id?: string;
	/** The ID of the chip which triggered the editor. */
	chipId: string;
	/** The child elements. */
	children?: ReactNode;
	/** Function invoked when the editor is closed. */
	onClose: () => void;
	/** Function invoked when the save button is clicked. */
	onSave: MouseEventHandler<HTMLButtonElement>;
}

/** Wrapper for filter editors. */
declare const FilterEditor: FunctionComponent<FilterEditorProps>;
export default FilterEditor;
