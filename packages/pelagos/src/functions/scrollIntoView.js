import smoothScroll from './smoothScroll';

/**
 * Scrolls the specified element into view.
 * @param {Element} element the element to scroll.
 * @param {Object} options the scroll options.
 * @param {boolean} [options.alignBottom] whether the element should be aligned to the bottom of its container.
 * @param {boolean} [options.smooth] whether to animate the scrolling.
 * @param {number} [options.duration] the duration of the animation, default: 150ms.
 * @param {function(): void} [options.done] invoked after scrolling.
 *
 * @example
 * import {useCallback} from 'react';
 * import {scrollIntoView} from '@bluecateng/pelagos';
 *
 * const Example = () => {
 *   const handleClick = useCallback(() => scrollIntoView(document.getElementById('other')), []);
 *   return <button onClick={handleClick}>...</button>;
 * }
 */
const scrollIntoView = (element, options = {}) => {
	const {alignBottom, smooth, duration, done} = {duration: 150, ...options};
	let parent = element.parentNode;
	// find an element that can scroll
	while (
		parent !== document.body &&
		(window.getComputedStyle(parent).overflowY === 'visible' || parent.clientHeight >= parent.scrollHeight)
	) {
		parent = parent.parentNode;
	}
	const er = element.getBoundingClientRect();
	const pr = parent.getBoundingClientRect();
	if (er.top < pr.top || er.bottom > pr.bottom) {
		const initialTop = parent.scrollTop;
		const offset = alignBottom
			? Math.max(-initialTop, er.bottom - pr.bottom)
			: Math.min(er.top - pr.top, parent.scrollHeight - initialTop - pr.bottom + pr.top);
		if (smooth) {
			smoothScroll(parent, initialTop, offset, duration, done);
		} else {
			parent.scrollTop = initialTop + offset;
			parent.dispatchEvent(new CustomEvent('scroll'));
			if (done) {
				done();
			}
		}
	} else if (done) {
		done();
	}
};

export default scrollIntoView;
