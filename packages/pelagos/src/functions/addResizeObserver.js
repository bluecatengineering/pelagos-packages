import throttleAF from './throttleAF';

/**
 * Adds a resize observer to the specified target element.
 * @param {Element} target the target element.
 * @param {function(DOMRectReadOnly): void} callback the function called when the element is resized.
 * @returns {function(): void} a function to disconnect the observer.
 */
export default (target, callback) => {
	let rect;
	const f = throttleAF(() => callback(rect));
	const observer = new ResizeObserver((entries) => ((rect = entries[0].contentRect), f()));
	observer.observe(target);
	return () => (f.cancel(), observer.disconnect());
};
