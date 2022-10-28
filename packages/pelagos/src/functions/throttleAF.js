/**
 * Throttles calls to the specified function using `requestAnimationFrame`.
 * @param {function} f the function to throttle.
 * @returns {{(): function, cancel: function(): void, flush: function(): void}} a wrapping function.
 *
 * @example
 * import {useMemo} from 'react';
 * import {throttleAF} from '@bluecateng/pelagos';
 *
 * const Example = () => {
 *   const handleChange = useMemo(() => throttleAF(() => {
 *     // a task that may take some time
 *   }), []);
 *   return <input onChange={handleChange} />;
 * }
 */
const throttleAF = (f) => {
	let frame, lastArgs;
	const apply = () => {
		const args = lastArgs;
		lastArgs = null;
		frame = null;
		f(...args);
	};
	const handler = (...args) => {
		lastArgs = args;
		if (!frame) {
			frame = requestAnimationFrame(apply);
		}
	};
	handler.cancel = () => {
		if (frame) {
			cancelAnimationFrame(frame);
			lastArgs = null;
			frame = null;
		}
	};
	handler.flush = () => {
		if (frame) {
			cancelAnimationFrame(frame);
			apply();
		}
	};
	return handler;
};

export default throttleAF;
