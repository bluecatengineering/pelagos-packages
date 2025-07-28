import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface DetailEntryProps extends Omit<HTMLProps<HTMLDivElement>, 'value'> {
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
	/** The value to be displayed. */
	value?: ReactNode;
	/** The layout direction for the value. */
	direction?: 'column' | 'row';
	/** The value class name(s). */
	valueClass?: string;
	/** The title for the value. */
	valueTitle?: string;
	/** The child elements, can be provided instead of the value. */
	children?: ReactNode;
}

/** An entry in the details panel. */
declare const DetailEntry: FunctionComponent<DetailEntryProps>;
export default DetailEntry;
