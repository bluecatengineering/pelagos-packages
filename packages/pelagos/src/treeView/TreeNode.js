import {useCallback, useContext, useRef} from 'react';
import PropTypes from 'prop-types';
import {faCaretRight} from '@fortawesome/free-solid-svg-icons';

import SvgIcon from '../components/SvgIcon';

import TreeViewContext from './TreeViewContext';
import TreeNodeContext from './TreeNodeContext';

/** A node in a TreeView. */
const TreeNode = ({id, labelClassName, label, icon, expanded, loading, children, onToggle, ...props}) => {
	const nodeRef = useRef(null);
	const {selected, focused, setFocused, onSelect} = useContext(TreeViewContext);
	const {level, padding: parentPadding, hasIcon} = useContext(TreeNodeContext);
	const leaf = expanded === undefined;
	const padding = parentPadding + 16 + (leaf ? 24 : 0) + (hasIcon ? 8 : 0);
	const nodeContextValue = {level: level + 1, padding, hasIcon: !!icon};

	const handleClick = useCallback(
		(event) => {
			event.stopPropagation();
			onSelect?.(id);
			setFocused(id);
		},
		[id, onSelect, setFocused]
	);
	const handleToggleClick = useCallback(
		(event) => {
			event.stopPropagation();
			onToggle?.(id, !expanded);
		},
		[expanded, id, onToggle]
	);
	const handleKeyDown = useCallback(
		(event) => {
			if (!event.ctrlKey && !event.altKey && !event.metaKey) {
				const node = nodeRef.current;
				const focusNode = (node) => {
					node.focus();
					setFocused(node.id);
				};
				switch (event.key) {
					case 'Enter':
					case ' ':
						event.preventDefault();
						event.stopPropagation();
						if (id !== selected) {
							onSelect?.(id);
						}
						break;
					case 'ArrowLeft':
						event.preventDefault();
						event.stopPropagation();
						if (expanded) {
							onToggle?.(id, false);
						} else if (level !== 0) {
							focusNode(node.parentNode.parentNode);
						}
						break;
					case 'ArrowRight':
						event.preventDefault();
						event.stopPropagation();
						// explicit check for false since undefined means leaf node
						if (expanded === false) {
							onToggle?.(id, true);
						} else if (expanded) {
							focusNode(node.lastChild.firstChild);
						}
						break;
					case 'ArrowUp': {
						event.preventDefault();
						event.stopPropagation();
						const previousSibling = node.previousSibling;
						if (previousSibling) {
							if (previousSibling.getAttribute('aria-expanded') === 'true') {
								focusNode(previousSibling.lastChild.lastChild);
							} else {
								focusNode(previousSibling);
							}
						} else if (level !== 0) {
							focusNode(node.parentNode.parentNode);
						}
						break;
					}
					case 'ArrowDown':
						event.preventDefault();
						event.stopPropagation();
						if (expanded) {
							focusNode(node.lastChild.firstChild);
						} else if (node.nextSibling) {
							focusNode(node.nextSibling);
						} else if (level !== 0) {
							const parentNode = node.parentNode.parentNode;
							if (parentNode.nextSibling) {
								focusNode(parentNode.nextSibling);
							}
						}
						break;
					case 'Home':
						if (level === 0) {
							event.preventDefault();
							event.stopPropagation();
							focusNode(node.parentNode.firstChild);
						}
						break;
					case 'End':
						if (level === 0) {
							event.preventDefault();
							event.stopPropagation();
							let lastNode = node.parentNode.lastChild;
							while (lastNode.getAttribute('aria-expanded') === 'true') {
								lastNode = lastNode.lastChild.lastChild;
							}
							focusNode(lastNode);
						}
						break;
					case '-':
						event.preventDefault();
						event.stopPropagation();
						if (expanded) {
							onToggle?.(id, false);
						}
						break;
					case '+':
						event.preventDefault();
						event.stopPropagation();
						// explicit check for false since undefined means leaf node
						if (expanded === false) {
							onToggle?.(id, true);
						}
						break;
				}
			}
		},
		[expanded, id, level, onSelect, onToggle, selected, setFocused]
	);

	return (
		<li
			{...props}
			id={id}
			className="TreeView__node"
			tabIndex={focused === id ? 0 : -1}
			role="treeitem"
			aria-expanded={expanded}
			aria-selected={selected === id}
			ref={nodeRef}
			onClick={handleClick}
			onKeyDown={handleKeyDown}>
			<div className="TreeView__label" style={{paddingLeft: `${padding}px`}}>
				{!leaf && (
					<span className="TreeView__iconWrapper" onClick={handleToggleClick}>
						{loading ? (
							<span className="CssSpinner TreeView__loading" />
						) : (
							<SvgIcon className={`TreeView__icon${expanded ? ' TreeView--expanded' : ''}`} icon={faCaretRight} />
						)}
					</span>
				)}
				{icon && (
					<span className="TreeView__iconWrapper">
						<SvgIcon className="TreeView__icon" icon={icon} />
					</span>
				)}
				<span
					className={`TreeView__text${labelClassName ? ` ${labelClassName}` : ''}`}
					title={typeof label === 'string' ? label : null}>
					{label}
				</span>
			</div>
			{expanded && (
				<TreeNodeContext.Provider value={nodeContextValue}>
					<ul className="TreeView__children" role="group">
						{children}
					</ul>
				</TreeNodeContext.Provider>
			)}
		</li>
	);
};

TreeNode.propTypes = {
	/** The node identifier. */
	id: PropTypes.string,
	/** The label element class name(s). */
	labelClassName: PropTypes.string,
	/** The node label. */
	label: PropTypes.node,
	/** The node icon. */
	icon: PropTypes.object,
	/** Whether the node is expanded. Either true or false denote a parent node, undefined (or not set) denotes a leaf (or end) node. */
	expanded: PropTypes.bool,
	/** Whether the child nodes are being loaded. */
	loading: PropTypes.bool,
	/** The child nodes. */
	children: PropTypes.node,
	/** Function invoked when a parent node is toggled. */
	onToggle: PropTypes.func,
};

export default TreeNode;
