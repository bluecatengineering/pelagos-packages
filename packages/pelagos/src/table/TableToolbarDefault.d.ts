import type {FunctionComponent, ReactNode} from 'react';

interface TableToolbarDefaultProps {
	/** The component class name(s). */
	className?: string;
	/** Whether this toolbar should be hidden (when TableToolbarBatch is visible). */
	hidden?: boolean;
	/** The alignment for children. */
	align: 'start' | 'end';
	/** The child elements. */
	children?: ReactNode;
}

/** Table toolbar for default actions. */
declare const TableToolbarDefault: FunctionComponent<TableToolbarDefaultProps>;
export default TableToolbarDefault;
