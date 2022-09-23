import animate from './animate';

/**
 * Scrolls the specified element using an animation.
 * @param {Element} element the element to scroll.
 * @param {number} initialTop the initial scroll top.
 * @param {number} offset the number of pixels to scroll.
 * @param {number} duration the duration of the animation.
 * @param {function(): void} [done] invoked after scrolling.
 * @returns {{cancel: (function(): void)}}
 */
export default (element, initialTop, offset, duration, done) =>
	animate(
		duration,
		(current) => (element.scrollTop = initialTop + current * offset),
		() => {
			if (done) done();
			element.dispatchEvent(new CustomEvent('scroll'));
		}
	);
