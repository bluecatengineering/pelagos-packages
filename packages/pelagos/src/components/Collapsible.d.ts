import type {FunctionComponent, MouseEventHandler, ReactNode} from 'react';

interface CollapsibleProps {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** Whether the child component is displayed. */
	open: boolean;
	/** The child components (header and content). */
	children?: [ReactNode, ReactNode];
	/** Function invoked when the header is clicked. */
	onHeaderClick: MouseEventHandler<HTMLButtonElement>;
}

/** A collapsible container. */
declare const Collapsible: FunctionComponent<CollapsibleProps>;
export default Collapsible;
