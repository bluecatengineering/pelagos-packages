import type {FunctionComponent, HTMLProps} from 'react';

interface ContentSwitcherButtonProps extends HTMLProps<HTMLButtonElement> {
	/** The component class name(s). */
	className?: string;
	/** The text to display. */
	text: string;
	/** Whether the button is selected, set by ContentSwitcher. */
	selected?: boolean;
}

/** A button inside a ContentSwitcher. */
declare const ContentSwitcherButton: FunctionComponent<ContentSwitcherButtonProps>;
export default ContentSwitcherButton;
