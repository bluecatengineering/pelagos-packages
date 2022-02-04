export default (f) => {
	let frame, lastArgs;
	const apply = () => {
		const args = lastArgs;
		lastArgs = null;
		frame = null;
		// args is null sometimes in IE
		// istanbul ignore next
		if (args) {
			f(...args);
		}
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
