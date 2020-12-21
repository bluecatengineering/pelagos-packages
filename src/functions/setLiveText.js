const getLiveElement = () => {
	let element = document.getElementById('liveText');
	if (!element) {
		element = document.createElement('div');
		element.id = 'liveText';
		element.className = 'assistive-text';
		element.setAttribute('aria-live', 'assertive');
		document.body.appendChild(element);
	}
	return element;
};

export default (text) => (getLiveElement().textContent = text);