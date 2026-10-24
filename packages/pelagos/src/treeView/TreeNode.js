import {useCallback, useContext, useEffect, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import CaretRight from '@carbon/icons-react/es/CaretRight';

import TreeViewContext from './TreeViewContext';
import TreeNodeContext from './TreeNodeContext';

// Returns the last visible node in the subtree, an expanded node may have no children while they load
const getLastVisible = (node) => {
	while (node.getAttribute('aria-expanded') === 'true' && node.lastChild.lastChild) {
		node = node.lastChild.lastChild;
	}
	return node;
};

/** A node in a TreeView. */
const TreeNode = ({
	id,
	labelClassName,
	label,
	icon: Icon,
	expanded,
	loading,
	children,
	onToggle,
	onClick,
	onKeyDown,
	...props
}) => {
	const nodeRef = useRef(null);
	const {selected, focused, setFocused, onSelect} = useContext(TreeViewContext);
	const {level, padding: parentPadding, parentPath, hasIcon} = useContext(TreeNodeContext);
	const leaf = expanded === undefined;
	const childrenLevel = level + 1;
	const padding = parentPadding + 16 + (leaf ? 24 : 0) + (hasIcon ? 8 : 0);
	const path = useMemo(() => [...parentPath, id], [id, parentPath]);
	const nodeContextValue = {level: childrenLevel, padding, parentPath: path, hasIcon: !!Icon};

	// The handlers set by the caller run first, they can call preventDefault to skip the default behaviour
	const handleClick = useCallback(
		(event) => {
			onClick?.(event);
			if (!event.defaultPrevented) {
				event.stopPropagation();
				onSelect?.(path);
				setFocused(path);
			}
		},
		[onClick, onSelect, path, setFocused]
	);
	const handleToggleClick = useCallback(
		(event) => {
			event.stopPropagation();
			onToggle?.();
		},
		[onToggle]
	);
	const handleKeyDown = useCallback(
		(event) => {
			onKeyDown?.(event);
			if (!event.defaultPrevented && !event.ctrlKey && !event.altKey && !event.metaKey) {
				const node = nodeRef.current;
				const focusNode = (node) => {
					node.focus();
					const nodePath = [node.id];
					while (node.parentNode.getAttribute('role') !== 'tree') {
						node = node.parentNode.parentNode;
						nodePath.push(node.id);
					}
					setFocused(nodePath.reverse());
				};
				switch (event.key) {
					case 'Enter':
					case ' ':
						event.preventDefault();
						event.stopPropagation();
						if (selected?.at(-1) !== id) {
							onSelect?.(path);
						}
						break;
					case 'ArrowLeft':
						event.preventDefault();
						event.stopPropagation();
						if (expanded) {
							onToggle?.();
						} else if (level !== 0) {
							focusNode(node.parentNode.parentNode);
						}
						break;
					case 'ArrowRight':
						event.preventDefault();
						event.stopPropagation();
						// explicit check for false since undefined means leaf node
						if (expanded === false) {
							onToggle?.();
						} else if (expanded && node.lastChild.firstChild) {
							focusNode(node.lastChild.firstChild);
						}
						break;
					case 'ArrowUp': {
						event.preventDefault();
						event.stopPropagation();
						const previousSibling = node.previousSibling;
						if (previousSibling) {
							focusNode(getLastVisible(previousSibling));
						} else if (level !== 0) {
							focusNode(node.parentNode.parentNode);
						}
						break;
					}
					case 'ArrowDown':
						event.preventDefault();
						event.stopPropagation();
						if (expanded && node.lastChild.firstChild) {
							focusNode(node.lastChild.firstChild);
						} else if (node.nextSibling) {
							focusNode(node.nextSibling);
						} else {
							let done;
							let currentLevel = level;
							let currentNode = node;
							while (!done && currentLevel !== 0) {
								const parentNode = currentNode.parentNode.parentNode;
								if (parentNode.nextSibling) {
									focusNode(parentNode.nextSibling);
									done = true;
								} else {
									--currentLevel;
									currentNode = parentNode;
								}
							}
						}
						break;
					case 'Home':
						event.preventDefault();
						event.stopPropagation();
						focusNode(node.closest('[role="tree"]').firstChild);
						break;
					case 'End':
						event.preventDefault();
						event.stopPropagation();
						focusNode(getLastVisible(node.closest('[role="tree"]').lastChild));
						break;
					case '-':
						event.preventDefault();
						event.stopPropagation();
						if (expanded) {
							onToggle?.();
						}
						break;
					case '+':
						event.preventDefault();
						event.stopPropagation();
						// explicit check for false since undefined means leaf node
						if (expanded === false) {
							onToggle?.();
						}
						break;
				}
			}
		},
		[expanded, id, level, onKeyDown, onSelect, onToggle, path, selected, setFocused]
	);

	useEffect(() => {
		if (!expanded && focused.length > childrenLevel && focused[level] === id) {
			setFocused(path);
		}
	}, [childrenLevel, expanded, focused, id, level, path, setFocused]);

	return (
		<li
			{...props}
			id={id}
			className="TreeView__node"
			tabIndex={focused.at(-1) === id ? 0 : -1}
			role="treeitem"
			aria-expanded={expanded}
			aria-selected={selected?.at(expanded ? -1 : level) === id}
			ref={nodeRef}
			onClick={handleClick}
			onKeyDown={handleKeyDown}>
			<div className="TreeView__label" style={{paddingLeft: `${padding}px`}}>
				{!leaf && (
					<span className="TreeView__iconWrapper" onClick={handleToggleClick}>
						{loading ? (
							<span className="CssSpinner TreeView__loading" role="status" aria-label={t`Loading node`} />
						) : (
							<CaretRight className={`TreeView__icon${expanded ? ' TreeView--expanded' : ''}`} />
						)}
					</span>
				)}
				{Icon && (
					<span className="TreeView__iconWrapper">
						<Icon className="TreeView__icon" />
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
	/** The node identifier. Must be globally unique since it's use as DOM id. */
	id: PropTypes.string,
	/** The label element class name(s). */
	labelClassName: PropTypes.string,
	/** The node label. */
	label: PropTypes.node,
	/** The node icon. */
	icon: PropTypes.elementType,
	/** Whether the node is expanded. Either true or false denote a parent node, undefined (or not set) denotes a leaf (or end) node. */
	expanded: PropTypes.bool,
	/** Whether the child nodes are being loaded. */
	loading: PropTypes.bool,
	/** The child nodes. */
	children: PropTypes.node,
	/** Function invoked when a parent node is toggled. */
	onToggle: PropTypes.func,
	/** Function invoked when the element is clicked, before the default behaviour which is skipped if it calls preventDefault. */
	onClick: PropTypes.func,
	/** Function invoked when a key is pressed, before the default behaviour which is skipped if it calls preventDefault. */
	onKeyDown: PropTypes.func,
};

export default TreeNode;
