import {Children, forwardRef, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';
import ChevronLeft from '@carbon/icons-react/es/ChevronLeft';
import ChevronRight from '@carbon/icons-react/es/ChevronRight';

import setRefs from '../functions/setRefs';
import addResizeObserver from '../functions/addResizeObserver';

import TabContext from './TabContext';

import './TabList.less';

const {min, max, round} = Math;

const keyHandlers = {
	Home: () => 0,
	End: (last) => last,
	ArrowLeft: (last, focused) => (focused === 0 ? last : focused - 1),
	ArrowRight: (last, focused) => (focused === last ? 0 : focused + 1),
};

/** A list of tabs. When using this component the related tab panels should follow the indication in: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ */
const TabList = forwardRef(({className, selectedIndex, contained, children, onChange, ...props}, ref) => {
	const listRef = useRef(null);
	const refs = ref ? setRefs(ref, listRef) : listRef;
	const [focused, setFocused] = useState(selectedIndex);
	const [canScroll, setCanScroll] = useState(false);
	const [scrollLeft, setScrollLeft] = useState(0);

	const handleKeyDown = useCallback((event) => {
		if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
			const keyHandler = keyHandlers[event.key];
			if (keyHandler) {
				const childNodes = listRef.current.childNodes;
				const last = childNodes.length - 1;
				event.preventDefault();
				setFocused((focused) => {
					const result = keyHandler(last, focused);
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

	const handleScroll = useMemo(() => debounce((event) => setScrollLeft(event.target.scrollLeft), 150), []);

	const handleLeftClick = useCallback(() => {
		const list = listRef.current;
		setScrollLeft((scrollLeft) => max(scrollLeft - list.scrollWidth / list.childNodes.length, 0));
	}, []);
	const handleRightClick = useCallback(() => {
		const list = listRef.current;
		setScrollLeft((scrollLeft) =>
			min(scrollLeft + list.scrollWidth / list.childNodes.length, list.scrollWidth - list.clientWidth)
		);
	}, []);

	useEffect(() => setFocused(selectedIndex), [selectedIndex]);

	useEffect(() => {
		listRef.current.scrollLeft = round(scrollLeft); // scrollLeft is integer, rounding avoids off by 1 errors
	}, [scrollLeft]);

	useEffect(
		() =>
			addResizeObserver(
				listRef.current,
				({width}) => listRef.current && setCanScroll(listRef.current.scrollWidth > round(width))
			),
		[]
	);

	useEffect(() => setCanScroll(listRef.current.scrollWidth > listRef.current.clientWidth), [children]);

	useEffect(() => {
		if (canScroll) {
			const list = listRef.current;
			const tab = list.childNodes[focused];
			const buttonWidth = contained ? 48 : 40;
			const {left: listLeft, right: listRight, width: listWidth} = list.getBoundingClientRect();
			const {left, right} = tab.getBoundingClientRect();

			const visibleLeft = listLeft + buttonWidth;
			const visibleRight = listRight - buttonWidth;
			if (left < visibleLeft) {
				setScrollLeft(max(list.scrollLeft + left - visibleLeft - 4, 0));
			} else if (right > visibleRight) {
				setScrollLeft(min(list.scrollLeft + right - visibleRight + 4, list.scrollWidth - listWidth));
			}
		}
	}, [canScroll, contained, focused]);

	const hasSecondary = contained && Children.toArray(children).some((child) => child.props.secondaryLabel);
	const showScrollLeft = canScroll && listRef.current && scrollLeft !== 0;
	const showScrollRight =
		canScroll && listRef.current && scrollLeft + listRef.current.clientWidth < listRef.current.scrollWidth;

	return (
		<div
			className={`TabList TabList--${contained ? 'contained' : 'line'}${hasSecondary ? ' TabList--tall' : ''}${
				className ? ` ${className}` : ''
			}`}>
			<button
				className="TabList__scroll TabList--left"
				type="button"
				hidden={!showScrollLeft}
				tabIndex={-1}
				aria-hidden
				onClick={handleLeftClick}>
				<ChevronLeft />
			</button>
			<div
				{...props}
				className="TabList__list"
				role="tablist"
				ref={refs}
				onKeyDown={handleKeyDown}
				onBlur={handleBlur}
				onScroll={handleScroll}>
				{Children.map(children, (child, index) => (
					<TabContext.Provider value={{index, selectedIndex, focused, hasSecondary, onChange}}>
						{child}
					</TabContext.Provider>
				))}
			</div>
			<button
				className="TabList__scroll TabList--right"
				type="button"
				hidden={!showScrollRight}
				tabIndex={-1}
				aria-hidden
				onClick={handleRightClick}>
				<ChevronRight />
			</button>
		</div>
	);
});

TabList.displayName = 'TabList';

TabList.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The index of the selected tab. */
	selectedIndex: PropTypes.number,
	/** Whether the tabs use the contained style. */
	contained: PropTypes.bool,
	/** The tabs. */
	children: PropTypes.node,
	/** Function invoked when the selected tab changes. */
	onChange: PropTypes.func,
};

export default TabList;
