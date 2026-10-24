import {Children, cloneElement, useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import './ContentSwitcher.less';

/**
 * A component which allows users to toggle between two or more content sections within the same space.
 * The caller is responsible for setting either `aria-label` or `aria-labelledby` on this component and
 * `aria-controls` and `aria-labelledby` on the buttons and panels respectively, for more details see
 * [WAI-ARIA Tabs roles, states, and properties](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/#wai-aria-roles-states-and-properties-22).
 */
const ContentSwitcher = ({className, selected, children, onChange, ...props}) => {
	const ref = useRef(null);
	const [focused, setFocused] = useState(selected);

	// Enter and Space are handled by the buttons, they trigger a click
	const handleClick = useCallback(
		(event) => {
			const button = event.target.closest('[role="tab"]');
			if (button) {
				const index = +button.dataset.index;
				setFocused(index);
				if (index !== selected) {
					onChange(index);
				}
			}
		},
		[onChange, selected]
	);

	const childCount = Children.toArray(children).length;
	const handleKeyDown = useCallback(
		(event) => {
			switch (event.key) {
				case 'ArrowLeft':
					setFocused(focused === 0 ? childCount - 1 : focused - 1);
					break;
				case 'ArrowRight':
					setFocused(focused === childCount - 1 ? 0 : focused + 1);
					break;
			}
		},
		[childCount, focused]
	);

	const handleBlur = useCallback(
		(event) => {
			if (ref.current && !ref.current.contains(event.relatedTarget) && focused !== selected) {
				setFocused(selected);
			}
		},
		[focused, selected]
	);

	useEffect(() => setFocused(selected), [selected]);

	useEffect(() => {
		const container = ref.current;
		if (container?.contains(document.activeElement)) {
			container.childNodes[focused].focus();
		}
	}, [focused]);

	return (
		<div
			{...props}
			className={`ContentSwitcher${className ? ` ${className}` : ''}`}
			role="tablist"
			aria-orientation="horizontal"
			ref={ref}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			onBlur={handleBlur}>
			{Children.toArray(children).map((child, index) =>
				cloneElement(child, {
					tabIndex: index === focused ? 0 : -1,
					selected: index === selected,
					'data-index': index,
				})
			)}
		</div>
	);
};

ContentSwitcher.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The index of the selected button. */
	selected: PropTypes.number,
	/** The buttons. */
	children: PropTypes.node,
	/** Function invoked when selected button changes. */
	onChange: PropTypes.func,
};

export default ContentSwitcher;
