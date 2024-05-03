export default (svg, size, start) => {
	const gradient = svg.querySelector('linearGradient');
	gradient.setAttribute('x2', 2 * size);
	gradient.setAttribute('gradientTransform', `translate(-${start * size} 0)`);
};
