export default (text) => {
	if (navigator.clipboard) {
		return navigator.clipboard.writeText(text);
	}

	return new Promise((resolve, reject) => {
		const input = document.createElement('input');
		input.style.position = 'absolute';
		input.style.top = '-100px';
		input.value = text;

		document.body.appendChild(input);
		input.select();
		try {
			document.execCommand('copy');
			resolve();
		} catch (err) {
			reject(err);
		}
		document.body.removeChild(input);
	});
};
