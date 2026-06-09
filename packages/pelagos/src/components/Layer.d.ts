import type {ComponentPropsWithRef, ElementType, ReactElement, ReactNode} from 'react';

interface LayerOwnProps {
	/** The level for this layer, if specified overrides the hierarchy based level. */
	level?: 1 | 2 | 3;
	/** The child elements. */
	children?: ReactNode;
}

type LayerProps<T extends ElementType = 'div'> = LayerOwnProps & {
	/** Element or custom component to use as top-level element. */
	as?: T;
} & Omit<ComponentPropsWithRef<T>, keyof LayerOwnProps | 'as'>;

/** Starts a new layer. */
declare const Layer: <T extends ElementType = 'div'>(props: LayerProps<T>) => ReactElement;
export default Layer;
