import type {FunctionComponent, HTMLProps, MouseEventHandler, ReactNode} from 'react';

interface TableToolbarBatchProps extends HTMLProps<HTMLDivElement> {
	/** The component class name(s). */
	className?: string;
	/** The count of selected items. */
	selectedCount: number;
	/** The child elements. */
	children?: ReactNode;
	/** Function invoked when the cancel button is clicked. */
	onCancel?: MouseEventHandler<HTMLButtonElement>;
}

/** Table toolbar for batch actions. */
declare const TableToolbarBatch: FunctionComponent<TableToolbarBatchProps>;
export default TableToolbarBatch;
