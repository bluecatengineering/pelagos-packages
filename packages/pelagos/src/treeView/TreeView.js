import {Children, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import TreeViewContext from './TreeViewContext';
import TreeNodeContext from './TreeNodeContext';

import './TreeView.less';

const nodeContextValue = {level: 0, padding: 0};

/** A component implementing the tree view pattern. */
const TreeView = ({className, size, selected, children, onSelect, ...props}) => {
	const rootRef = useRef(null);
	const [focused, setFocused] = useState(() => selected || Children.toArray(children)[0]?.props.id);
	useEffect(() => {
		if (!rootRef.current.contains(document.activeElement)) {
			setFocused(selected || Children.toArray(children)[0]?.props.id);
		}
	}, [children, selected]);
	return (
		<TreeViewContext.Provider value={{selected, focused, setFocused, onSelect}}>
			<TreeNodeContext.Provider value={nodeContextValue}>
				<ul
					{...props}
					className={`TreeView TreeView--${size}${className ? ` ${className}` : ''}`}
					role="tree"
					ref={rootRef}>
					{children}
				</ul>
			</TreeNodeContext.Provider>
		</TreeViewContext.Provider>
	);
};

TreeView.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The node size. */
	size: PropTypes.oneOf(['sm', 'xs']),
	/** The ID of the selected node. */
	selected: PropTypes.string,
	/** The child nodes. */
	children: PropTypes.node,
	/** Function invoked when a node is selected. */
	onSelect: PropTypes.func,
};

TreeView.defaultProps = {
	size: 'sm',
};

export default TreeView;
