import smoothScroll from './smoothScroll';

/**
 * Scrolls to the specified element inside the container.
 * @param {Element} container the containing element.
 * @param {Element} element the element to scroll.
 * @param {Object} options the scroll options.
 * @param {number} [options.headerHeight] the height of the header.
 * @param {number} [options.duration] the duration of the animation, default: 150ms.
 * @param {function(): void} [options.done] invoked after scrolling.
 */
export default (container, element, options = {}) => {
	const {headerHeight, duration, done} = {headerHeight: 0, duration: 150, ...options};
	const listHeight = container.clientHeight;
	if (container.scrollHeight > listHeight) {
		const scrollTop = container.scrollTop;
		const scrollBottom = listHeight + scrollTop;
		const elementTop = element.offsetTop;
		const elementBottom = elementTop + element.offsetHeight;
		if (elementBottom > scrollBottom) {
			smoothScroll(container, scrollTop, elementBottom - listHeight - scrollTop, duration, done);
		} else if (elementTop - headerHeight < scrollTop) {
			smoothScroll(container, scrollTop, elementTop - headerHeight - scrollTop, duration, done);
		} else if (done) {
			done();
		}
	} else if (done) {
		done();
	}
};
