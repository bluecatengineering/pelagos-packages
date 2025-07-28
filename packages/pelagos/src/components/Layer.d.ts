import type {HTMLProps, ReactNode} from 'react';

interface LayerProps<T extends keyof HTMLElementTagNameMap = 'div'>
	extends Omit<HTMLProps<HTMLElementTagNameMap[T]>, 'as'> {
	/** Element or custom component to use as top-level element. */
	as?: T;
	/** The level for this layer, if specified overrides the hierarchy based level. */
	level?: 1 | 2 | 3;
	/** The child elements. */
	children?: ReactNode;
}

/** Starts a new layer. */
declare const Layer: <T extends keyof HTMLElementTagNameMap = 'div'>(props: LayerProps<T>) => ReactNode;
export default Layer;
