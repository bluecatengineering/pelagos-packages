import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface MenuProps extends HTMLProps<HTMLUListElement> {
	/** The component class name(s). */
	className?: string;
	/** The menu items. */
	children?: ReactNode;
}

/** A menu. This component can be used with useMenuHandler. */
declare const Menu: FunctionComponent<MenuProps>;
export default Menu;
