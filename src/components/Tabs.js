import {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import ScrollBox from './ScrollBox';
import './Tabs.less';

const getCurrentTab = (tabs) => document.getElementById(tabs.getAttribute('aria-activedescendant'));

const scrollTabs = (track, tr, overflow) => {
	if (overflow) {
		const tabs = track.firstChild;
		const currentTab = getCurrentTab(tabs);
		const wr = tabs.getBoundingClientRect();
		const cr = currentTab.getBoundingClientRect();
		if (cr.left < tr.left) {
			track.scrollLeft = cr.left - wr.left;
		} else if (cr.right > tr.right) {
			track.scrollLeft = cr.right - wr.left - tr.width;
		}
	}
};

/** Displays a row of tabs. */
const Tabs = ({id, items, currentTab, getTabKey, renderTab, onTabClick, onTabClose}) => {
	const tabsRef = useRef(null);

	const [focused, setFocused] = useState(null);

	const getTabIndex = useCallback(
		(tabKey) => items.findIndex((item) => getTabKey(item) === tabKey),
		[getTabKey, items]
	);

	const handleFocus = useCallback(() => {
		const tabs = tabsRef.current;
		const track = tabs.parentNode;
		const rect = track.getBoundingClientRect();
		if (rect.width < tabs.scrollWidth) {
			scrollTabs(track, rect, true);
		}
	}, []);

	const handleClick = useCallback(
		(event) => {
			const target = event.target;
			let element;
			if ((element = target.closest('button') || target.closest('[role="button"]'))) {
				event.preventDefault();
				onTabClose(element.dataset.key);
				event.currentTarget.focus();
			} else if ((element = target.closest('[role="tab"]'))) {
				event.preventDefault();
				if (element.getAttribute('aria-selected') !== 'true') {
					onTabClick(element.dataset.key);
				}
			}
		},
		[onTabClick, onTabClose]
	);

	const handleMouseDown = useCallback(
		(event) => {
			const element = event.target.closest('[role="tab"]');
			if (element) {
				event.preventDefault();
				setFocused(getTabIndex(element.dataset.key));
				const activeElement = document.activeElement;
				if (activeElement && activeElement !== event.currentTarget) {
					activeElement.blur();
				}
			}
		},
		[getTabIndex]
	);

	const handleMouseUp = useCallback(
		(event) => {
			if (event.button === 1) {
				const element = event.target.closest('[role="tab"]');
				if (element && element.dataset.canClose) {
					onTabClose(element.dataset.key);
				}
			}
		},
		[onTabClose]
	);

	const handleKeyDown = useCallback(
		(event) => {
			if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
				const last = items.length - 1;
				switch (event.keyCode) {
					case 13: // enter or space
					case 32: {
						const target = event.target;
						event.preventDefault();
						// Must use getAttribute because IE
						(target.getAttribute('role') === 'tablist' ? getCurrentTab(target) : target).click();
						break;
					}
					case 35: // end
						setFocused(last);
						break;
					case 36: // home
						setFocused(0);
						break;
					case 37: // left
						setFocused((focused) => (focused === 0 ? last : focused - 1));
						break;
					case 39: // right
						setFocused((focused) => (focused === last ? 0 : focused + 1));
						break;
				}
			}
		},
		[items]
	);

	const itemsRef = useRef(null);
	const currentTabRef = useRef(null);
	let currentFocused;
	if (itemsRef.current !== items || currentTabRef.current !== currentTab) {
		itemsRef.current = items;
		currentTabRef.current = currentTab;
		currentFocused = getTabIndex(currentTab);
		setFocused(currentFocused);
	} else {
		currentFocused = focused;
	}

	const firstTimeRef = useRef(true);
	useEffect(() => {
		// don't focus the first time the component is displayed
		if (firstTimeRef.current) {
			firstTimeRef.current = false;
		} else {
			const activeElement = document.activeElement;
			if (!activeElement || activeElement === document.body) {
				tabsRef.current.focus();
			}
		}
	}, [currentFocused]);

	return (
		<ScrollBox onResize={scrollTabs}>
			<div
				className="Tabs"
				tabIndex="0"
				role="tablist"
				aria-activedescendant={`${id}-${getTabKey(items[currentFocused])}`}
				ref={tabsRef}
				onFocus={handleFocus}
				onClick={handleClick}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onKeyDown={handleKeyDown}
			>
				{items.map((item, index) => renderTab(item, getTabKey(item) === currentTab, index === currentFocused))}
			</div>
		</ScrollBox>
	);
};

Tabs.propTypes = {
	/** The component ID. */
	id: PropTypes.string.isRequired,
	/** The tab items. */
	items: PropTypes.array.isRequired,
	/** The key of the current tab. */
	currentTab: PropTypes.string.isRequired,
	/** Function invoked to get the key of each tab. */
	getTabKey: PropTypes.func.isRequired,
	/** Function invoked to render each tab. */
	renderTab: PropTypes.func.isRequired,
	/** Function invoked when a tab is clicked. */
	onTabClick: PropTypes.func.isRequired,
	/** Function invoked when a tab is closed. */
	onTabClose: PropTypes.func,
};

export default Tabs;
