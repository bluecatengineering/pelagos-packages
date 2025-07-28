import type {FunctionComponent, HTMLProps, ReactNode} from 'react';
import type {CarbonIconType} from '@carbon/icons-react/es/CarbonIcon';

interface TreeNodeProps extends Omit<HTMLProps<HTMLLIElement>, 'label'> {
	/** The node identifier. Must be globally unique since it's use as DOM id. */
	id: string;
	/** The label element class name(s). */
	labelClassName?: string;
	/** The node label. */
	label: ReactNode;
	/** The node icon. */
	icon?: CarbonIconType;
	/** Whether the node is expanded. Either true or false denote a parent node, undefined (or not set) denotes a leaf (or end) node. */
	expanded?: boolean;
	/** Whether the child nodes are being loaded. */
	loading?: boolean;
	/** The child nodes. */
	children?: ReactNode;
	/** Function invoked when a parent node is toggled. */
	onToggle?: () => void;
}

/** A node in a TreeView. */
declare const TreeNode: FunctionComponent<TreeNodeProps>;
export default TreeNode;
