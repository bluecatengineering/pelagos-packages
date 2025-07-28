import type {FunctionComponent, HTMLProps} from 'react';

interface InfoTooltipProps extends HTMLProps<HTMLButtonElement> {
	/** The component class name(s). */
	className?: string;
	/** The tooltip text to display. */
	text: string;
	/** The placement of the tooltip relative to the icon. */
	placement?: 'left' | 'right' | 'top' | 'bottom';
}

/** A component displaying an informational tooltip. */
declare const InfoTooltip: FunctionComponent<InfoTooltipProps>;
export default InfoTooltip;
