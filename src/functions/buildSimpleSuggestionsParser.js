import identity from 'lodash-es/identity';

export default (validate, transform = identity) => (text, list) => {
	const allEntries = text.split(',').map((entry) => transform(entry.trim()));
	const entries = [];
	let error;
	for (let i = 0; i < allEntries.length; ++i) {
		const entry = allEntries[i];
		error = validate(entry);
		if (error) {
			return {error};
		}
		if (!entries.includes(entry) && !list.includes(entry)) {
			entries.push(entry);
		}
	}
	return {entries};
};
