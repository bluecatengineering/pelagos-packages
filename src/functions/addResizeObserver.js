import throttleAF from './throttleAF';

export default (target, callback) => {
	let rect;
	const f = throttleAF(() => callback(rect));
	const observer = new ResizeObserver((entries) => ((rect = entries[0].contentRect), f()));
	observer.observe(target);
	return () => (f.cancel(), observer.disconnect());
};
