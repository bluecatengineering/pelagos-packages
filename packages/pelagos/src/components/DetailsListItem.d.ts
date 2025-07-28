import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface DetailsListItemProps extends HTMLProps<HTMLLIElement> {
	/** The component class name(s). */
	className?: string;
	/** The child elements. */
	children?: ReactNode;
}

/** An item inside a DetailsList component. */
declare const DetailsListItem: FunctionComponent<DetailsListItemProps>;
export default DetailsListItem;
