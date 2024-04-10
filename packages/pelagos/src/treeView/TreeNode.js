import {useCallback, useContext, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';
import CaretRight from '@carbon/icons-react/es/CaretRight';

import TreeViewContext from './TreeViewContext';
import TreeNodeContext from './TreeNodeContext';
import arrayEquals from './arrayEquals';

/** A node in a TreeView. */
const TreeNode = ({id, labelClassName, label, icon: Icon, expanded, loading, children, onToggle, ...props}) => {
	const nodeRef = useRef(null);
	const {selected, focused, setFocused, onSelect} = useContext(TreeViewContext);
	const {level, padding: parentPadding, parentPath, hasIcon} = useContext(TreeNodeContext);
	const leaf = expanded === undefined;
	const padding = parentPadding + 16 + (leaf ? 24 : 0) + (hasIcon ? 8 : 0);
	const path = useMemo(() => [...parentPath, id], [id, parentPath]);
	const nodeContextValue = {level: level + 1, padding, parentPath: path, hasIcon: !!Icon};

	const handleClick = useCallback(
		(event) => {
			event.stopPropagation();
			onSelect?.(path);
			setFocused(id);
		},
		[id, onSelect, path, setFocused]
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
						if (!arrayEquals(path, selected)) {
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
						} else if (expanded) {
							focusNode(node.lastChild.firstChild);
						}
						break;
					case 'ArrowUp': {
						event.preventDefault();
						event.stopPropagation();
						const previousSibling = node.previousSibling;
						if (previousSibling) {
							let currentNode = previousSibling;
							while (currentNode.getAttribute('aria-expanded') === 'true') {
								currentNode = currentNode.lastChild.lastChild;
							}
							focusNode(currentNode);
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
		[expanded, level, onSelect, onToggle, path, selected, setFocused]
	);

	return (
		<li
			{...props}
			id={id}
			className="TreeView__node"
			tabIndex={focused === id ? 0 : -1}
			role="treeitem"
			aria-expanded={expanded}
			aria-selected={arrayEquals(expanded ? selected : selected?.slice(0, level + 1), path)}
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
	/** The node identifier. */
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
};

export default TreeNode;
