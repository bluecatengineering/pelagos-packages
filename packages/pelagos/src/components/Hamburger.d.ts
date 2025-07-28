import type {FunctionComponent, HTMLProps} from 'react';

interface HamburgerProps extends HTMLProps<HTMLButtonElement> {
	/** Whether the button is active. */
	active?: boolean;
	/** Function invoked when the button is clicked. */
	onClick?: () => void;
}

/** A hamburger button. */
declare const Hamburger: FunctionComponent<HamburgerProps>;
export default Hamburger;
