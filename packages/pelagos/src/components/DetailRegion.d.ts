import type {FunctionComponent, ReactNode} from 'react';

interface DetailRegionProps {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The header level. */
	level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
	/** The label text. */
	label: string;
	/** The text of the info tooltip to display. */
	infoText?: string;
	/** The placement of the info tooltip relative to the icon. */
	infoTextPlacement?: 'left' | 'right' | 'top' | 'bottom';
	/** The child elements. */
	children?: ReactNode;
}

/** A region in the details panel. */
declare const DetailRegion: FunctionComponent<DetailRegionProps>;
export default DetailRegion;
