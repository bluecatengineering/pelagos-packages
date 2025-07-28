import type {FunctionComponent, HTMLProps, MouseEventHandler, ReactNode} from 'react';
import type {CarbonIconType} from '@carbon/icons-react/es/CarbonIcon';

interface TagProps extends Omit<HTMLProps<HTMLButtonElement | HTMLDivElement>, 'onClick' | 'size'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The tag size. */
	size?: 'sm' | 'md';
	/** The tag type. */
	type?:
		| 'red'
		| 'magenta'
		| 'purple'
		| 'blue'
		| 'cyan'
		| 'teal'
		| 'green'
		| 'gray'
		| 'cool-gray'
		| 'warm-gray'
		| 'cyan-gray'
		| 'high-contrast'
		| 'outline';
	/** The tag icon. */
	icon?: CarbonIconType;
	/** The tag text. */
	text?: string;
	/** The tag title if different from the text. */
	tagTitle?: string;
	/** The title for the remove button. */
	removeTitle?: string;
	/** Function invoked when the tag is clicked. */
	onClick?: MouseEventHandler<HTMLButtonElement>;
	/** Function invoked when the remove button is clicked. Can't be used at the same time as onClick. The remove button is displayed only when this property is not null. */
	onRemove?: MouseEventHandler<HTMLButtonElement>;
	/** @deprecated use text instead. */
	children?: ReactNode;
}

/** A tag. */
declare const Tag: FunctionComponent<TagProps>;
export default Tag;
