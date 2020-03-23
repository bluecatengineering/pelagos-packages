export default (f) => {
	let frame;
	const handler = () => (frame ? null : (frame = requestAnimationFrame(() => ((frame = null), f()))));
	handler.cancel = () => (frame ? (cancelAnimationFrame(frame), (frame = null)) : null);
	return handler;
};
