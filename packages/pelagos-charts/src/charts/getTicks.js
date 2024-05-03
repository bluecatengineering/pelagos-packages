export default (scale, count) => {
	const domain = scale.domain();
	if (!scale.ticks) return domain;

	const ticks = scale.ticks(count);
	if (ticks.at(-1) >= domain[1]) {
		ticks.pop();
	}
	return ticks;
};
