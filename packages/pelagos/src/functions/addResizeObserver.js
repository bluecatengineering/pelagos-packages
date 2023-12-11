/**
 * Adds a resize observer to the specified target element.
 * @param {Element} target the target element.
 * @param {function(DOMRectReadOnly): void} callback the function called when the element is resized.
 * @returns {function(): void} a function to disconnect the observer.
 *
 * @example
 * import {useCallback, useEffect, useRef} from 'react';
 * import {addResizeObserver} from '@bluecateng/pelagos';
 *
 * const Example = () => {
 *   const ref = useRef(null);
 *   const handleResize = useCallback(r => {
 *     // handle resize
 *   }, []);
 *   useEffect(() => addResizeObserver(ref.current, handleResize), [handleResize]);
 *   return <div ref={ref}>...</div>;
 * }
 */
const addResizeObserver = (target, callback) => {
	const observer = new ResizeObserver((entries) => callback(entries[0].contentRect));
	observer.observe(target);
	return () => observer.disconnect();
};

export default addResizeObserver;
