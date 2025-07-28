import type {FunctionComponent} from 'react';
import type {CarbonIconType} from '@carbon/icons-react/es/CarbonIcon';

interface CopyButtonProps {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The data to copy to the clipboard. */
	data: string;
	/** The icon to display. */
	icon?: CarbonIconType;
	/** The tooltip text to display. */
	tooltipText?: string;
	/** The placement of the tooltip relative to the button. */
	tooltipPlacement?: 'left' | 'right' | 'top' | 'bottom';
	/** Whether the button is disabled. */
	disabled?: boolean;
}

/** Button to copy data to the clipboard. */
declare const CopyButton: FunctionComponent<CopyButtonProps>;
export default CopyButton;
