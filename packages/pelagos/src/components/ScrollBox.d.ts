import type {FunctionComponent, ReactNode} from 'react';

interface ScrollBoxProps {
	/** The component class name(s). */
	className?: string;
	/** The ID for the track element. */
	trackId?: string;
	/** The nested element. */
	children?: ReactNode;
	/** Function invoked when the element is resized. */
	onResize?: (track: HTMLDivElement, rect: DOMRect, overflow: boolean) => void;
}

/** @deprecated no replacement. */
declare const ScrollBox: FunctionComponent<ScrollBoxProps>;
export default ScrollBox;
