import type {FunctionComponent, MouseEventHandler, ReactElement} from 'react';

interface CollapsibleProps {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** Whether the child component is displayed. */
	open?: boolean;
	/** The child components: header and content. The content element is cloned and given an id, `role="region"`, `aria-labelledby`, and a ref — pass an element that can carry `role="region"` (e.g. a div wrapper), not a list or table, so the injected role does not override its semantics. A ref set on the content element must be stable (for example created with useRef or wrapped in useCallback), a new ref stops the running animation. */
	children: [ReactElement, ReactElement];
	/** Function invoked when the header is clicked. */
	onHeaderClick: MouseEventHandler<HTMLButtonElement>;
}

/** A collapsible container. */
declare const Collapsible: FunctionComponent<CollapsibleProps>;
export default Collapsible;
