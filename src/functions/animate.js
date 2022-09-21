const easing = (t) => (t < 0.5 ? t ** 4 * 8 : 1 - (--t) ** 4 * 8);

/**
 * Invokes the specified function using an easing curve.
 * @param {number} duration the duration of the animation.
 * @param {function(number): void} f invoked on each step of the animation.
 * @param {function(): void} [done] invoked when the animation is done.
 * @returns {{cancel: (function(): void)}}
 */
export default (duration, f, done) => {
	let frame;
	const startTime = performance.now();
	const nextStep = () => {
		frame = requestAnimationFrame(() => {
			const time = performance.now() - startTime;
			const current = time < duration ? easing(time / duration) : 1;
			f(current);
			if (current !== 1) {
				nextStep();
			} else if (done) {
				done();
			}
		});
	};
	nextStep();
	return {cancel: () => cancelAnimationFrame(frame)};
};
