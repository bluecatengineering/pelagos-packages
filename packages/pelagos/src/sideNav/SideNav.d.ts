import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface SideNavProps extends HTMLProps<HTMLDivElement> {
	/** The component class name(s). */
	className?: string;
	/** Whether the side navigation is active. */
	active?: boolean;
	/** The child elements. */
	children: ReactNode;
}

/** Side navigation component. */
declare const SideNav: FunctionComponent<SideNavProps>;
export default SideNav;
