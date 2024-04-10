export default (a, b) => {
	if (a === b) {
		return true;
	}
	if (!a || !b) {
		return false;
	}
	const length = a.length;
	if (length !== b.length) {
		return false;
	}
	for (let i = 0; i < length; ++i) {
		if (a[i] !== b[i]) {
			return false;
		}
	}
	return true;
};
