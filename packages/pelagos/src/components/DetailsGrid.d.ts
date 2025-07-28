import type {FunctionComponent, ReactNode} from 'react';

interface DetailsGridProps {
	/** The component class name(s). */
	className?: string;
	/** The child elements. */
	children?: ReactNode;
}

/** Grid component for detail panels. */
declare const DetailsGrid: FunctionComponent<DetailsGridProps>;
export default DetailsGrid;
