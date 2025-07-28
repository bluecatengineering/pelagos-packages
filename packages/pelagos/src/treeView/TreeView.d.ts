import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface TreeViewProps extends Omit<HTMLProps<HTMLUListElement>, 'selected' | 'size' | 'onSelect'> {
	/** The component class name(s). */
	className?: string;
	/** The node size. */
	size?: 'sm' | 'xs';
	/** The path of IDs to (and including) the selected node. */
	selected?: string[];
	/** The child nodes. */
	children?: ReactNode;
	/** Function invoked when a node is selected. */
	onSelect?: (selected: string[]) => void;
}

/** A component implementing the tree view pattern. */
declare const TreeView: FunctionComponent<TreeViewProps>;
export default TreeView;
