import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface MenuItemProps extends HTMLProps<HTMLLIElement> {
	/** The component class name(s). */
	className?: string;
	/** The menu item text. */
	text?: string;
	/** The menu item type. */
	type?: 'default' | 'danger';
	/** The content if it's more than just text. */
	children?: ReactNode;
	/** Whether the item is disabled. */
	disabled?: boolean;
}

/** A menu item. */
declare const MenuItem: FunctionComponent<MenuItemProps>;
export default MenuItem;
