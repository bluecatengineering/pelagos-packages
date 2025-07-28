import type {FunctionComponent, ReactNode} from 'react';

interface DetailsListProps {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The header level. */
	level?: 'h3' | 'h4' | 'h5' | 'h6';
	/** The label text. */
	label: string;
	/** The text of the info tooltip to display. */
	infoText?: string;
	/** The placement of the info tooltip relative to the icon. */
	infoTextPlacement?: 'left' | 'right' | 'top' | 'bottom';
	/** The child elements. */
	children?: ReactNode;
}

/** A list for the details panel. */
declare const DetailsList: FunctionComponent<DetailsListProps>;
export default DetailsList;
