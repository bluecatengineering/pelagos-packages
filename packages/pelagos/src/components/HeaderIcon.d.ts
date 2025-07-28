import type {FunctionComponent, HTMLProps} from 'react';
import type {CarbonIconType} from '@carbon/icons-react/es/CarbonIcon';

interface HeaderIconProps extends HTMLProps<HTMLDivElement> {
	/** The component class name(s). */
	className?: string;
	/** The icon to display. */
	icon: CarbonIconType;
	/** The label text. */
	label?: string;
	/** Whether the first letter of the label is underlined. */
	underline?: boolean;
}

/** An icon with a label underneath. */
declare const HeaderIcon: FunctionComponent<HeaderIconProps>;
export default HeaderIcon;
