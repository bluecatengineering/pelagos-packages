import {Children, forwardRef, useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import setRefs from '../functions/setRefs';

import TabContext from './TabContext';

import './VerticalTabList.less';

const findEnabled = (nodes, index, step, last) => {
	while (nodes[index].disabled) {
		index += step;
		if (index < 0) {
			index = last;
		} else if (index > last) {
			index = 0;
		}
	}
	return index;
};

const keyHandlers = {
	Home: (nodes, last) => findEnabled(nodes, 0, 1, last),
	End: (nodes, last) => findEnabled(nodes, last, -1, last),
	ArrowUp: (nodes, last, focused) => findEnabled(nodes, focused === 0 ? last : focused - 1, -1, last),
	ArrowDown: (nodes, last, focused) => findEnabled(nodes, focused === last ? 0 : focused + 1, 1, last),
};

/** A list of tabs arranged vertically. When using this component the related tab panels should follow the indication in: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ */
const VerticalTabList = forwardRef(({className, selectedIndex, children, onChange, ...props}, ref) => {
	const listRef = useRef(null);
	const refs = ref ? setRefs(ref, listRef) : listRef;
	const [focused, setFocused] = useState(selectedIndex);

	const handleKeyDown = useCallback((event) => {
		if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
			const keyHandler = keyHandlers[event.key];
			if (keyHandler) {
				const childNodes = listRef.current.childNodes;
				const last = childNodes.length - 1;
				event.preventDefault();
				setFocused((focused) => {
					const result = keyHandler(childNodes, last, focused);
					childNodes[result].focus();
					return result;
				});
			}
		}
	}, []);
	const handleBlur = useCallback(
		(event) => {
			if (listRef.current && !listRef.current.contains(event.relatedTarget) && focused !== selectedIndex) {
				setFocused(selectedIndex);
			}
		},
		[focused, selectedIndex]
	);

	useEffect(() => setFocused(selectedIndex), [selectedIndex]);

	return (
		<div
			{...props}
			className={`VerticalTabList${className ? ` ${className}` : ''}`}
			role="tablist"
			ref={refs}
			onKeyDown={handleKeyDown}
			onBlur={handleBlur}>
			{Children.map(children, (child, index) => (
				<TabContext.Provider value={{index, selectedIndex, focused, onChange}}>{child}</TabContext.Provider>
			))}
		</div>
	);
});

VerticalTabList.displayName = 'VerticalTabList';

VerticalTabList.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The index of the selected tab. */
	selectedIndex: PropTypes.number,
	/** The tabs. */
	children: PropTypes.node,
	/** Function invoked when the selected tab changes. */
	onChange: PropTypes.func,
};

export default VerticalTabList;
