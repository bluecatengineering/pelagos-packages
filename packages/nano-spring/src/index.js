export default (stiffness, damping, step, done) => {
	let f;
	const nextStep = () => {
		const t1 = performance.now();
		const dt = (t1 - t0) / 1000;
		t0 = t1;

		const springX = stiffness * (1 - p);
		const damperX = damping * v;
		const a = springX - damperX; // mass is 1
		v += a * dt;
		p += v * dt;

		if (Math.abs(p - 1) < 1e-3) {
			step(1);
			if (done) {
				done();
			}
		} else {
			step(p);
			f = requestAnimationFrame(nextStep);
		}
	};

	let v = 0;
	let p = 0;
	let t0 = performance.now();
	f = requestAnimationFrame(nextStep);
	return () => cancelAnimationFrame(f);
};
