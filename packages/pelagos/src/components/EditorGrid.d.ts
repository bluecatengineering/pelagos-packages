import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface EditorGridProps extends HTMLProps<HTMLDivElement> {
	/** The component class name(s). */
	className?: string;
	/** The child elements. */
	children?: ReactNode;
}

/** Grid component for editor forms. */
declare const EditorGrid: FunctionComponent<EditorGridProps>;
export default EditorGrid;
