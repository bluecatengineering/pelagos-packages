import type {ComponentPropsWithRef, ElementType, ReactElement, ReactNode} from 'react';

interface MenuItemOwnProps {
	/** The component class name(s). */
	className?: string;
	/** The menu item text. */
	text?: string;
	/** The menu item type. */
	type?: 'default' | 'danger';
	/** Whether the item is disabled. */
	disabled?: boolean;
	/** The content if it's more than just text. */
	children?: ReactNode;
}

type MenuItemProps<T extends ElementType = 'div'> = MenuItemOwnProps & {
	/** Element or custom component to use as main element. */
	as?: T;
} & Omit<ComponentPropsWithRef<T>, keyof MenuItemOwnProps | 'as'>;

/** A menu item. */
declare const MenuItem: <T extends ElementType = 'div'>(props: MenuItemProps<T>) => ReactElement;
export default MenuItem;
