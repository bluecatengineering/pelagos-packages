import {cloneElement, useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import './Tabs.less';

/** Displays components in tabs. */
const Tabs = ({id, active, items, onTabClick}) => {
	const [focused, setFocused] = useState(-1);
	const activeItem = useMemo(() => items.find((item) => item.id === active), [items, active]);

	const clearFocus = useCallback(() => setFocused(-1), []);

	const handleFocus = useCallback(() => setFocused(items.findIndex((item) => item.id === active)), [items, active]);

	const handleKeyDown = useCallback(
		(event) => {
			if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
				const keyCode = event.keyCode;
				switch (keyCode) {
					case 13: // enter
					case 32: // space
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						break;
					case 35: // end
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						setFocused(items.length - 1);
						break;
					case 36: // home
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						setFocused(0);
						break;
					case 37: // left
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						setFocused((focused) => (focused > 0 ? focused - 1 : items.length - 1));
						break;
					case 39: // right
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						setFocused((focused) => (focused < items.length - 1 ? focused + 1 : 0));
						break;
				}
			}
		},
		[items]
	);

	const handleKeyUp = useCallback(
		(event) => {
			if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
				switch (event.keyCode) {
					case 13: // enter
					case 32: // space
						event.preventDefault();
						event.nativeEvent.stopImmediatePropagation();
						onTabClick(items[focused].id);
						break;
				}
			}
		},
		[focused, items, onTabClick]
	);

	const handleMouseDown = useCallback((event) => {
		const element = event.target.closest('[role="tab"]');
		if (element) {
			event.preventDefault();
			event.currentTarget.focus();
			setFocused(+element.dataset.index);
		}
	}, []);

	const handleMouseUp = useCallback(
		(event) => {
			const element = event.target.closest('[role="tab"]');
			if (element) {
				event.preventDefault();
				onTabClick(items[+element.dataset.index].id);
			}
		},
		[items, onTabClick]
	);

	return (
		<div id={id} className="Tabs">
			<div
				id={`${id}-list`}
				className="Tabs__list"
				tabIndex="0"
				role="tablist"
				aria-activedescendant={focused === -1 ? null : `${id}-${focused}`}
				onFocus={handleFocus}
				onBlur={clearFocus}
				onKeyDown={handleKeyDown}
				onKeyUp={handleKeyUp}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}>
				{items.map((item, index) => (
					<div
						key={item.id}
						id={`${id}-${index}`}
						className={'Tabs__tab' + (index === focused ? ' Tabs__tab--focused' : '')}
						role="tab"
						aria-selected={item.id === active}
						aria-controls={`${id}-panel`}
						data-index={index}>
						{item.title}
					</div>
				))}
			</div>
			{activeItem ? cloneElement(activeItem.getPanel(), {id: `${id}-panel`, role: 'tabpanel'}) : null}
		</div>
	);
};

Tabs.propTypes = {
	/** The component ID. */
	id: PropTypes.string.isRequired,
	/** The ID of the active tab. */
	active: PropTypes.string.isRequired,
	/** The tab items. */
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			getPanel: PropTypes.func,
		})
	).isRequired,
	/** Function invoked when a tab is clicked. */
	onTabClick: PropTypes.func,
};

export default Tabs;
