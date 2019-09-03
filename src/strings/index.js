import messages from './en.strings.yaml';

export default (key, values) => {
	const msg = messages[key];
	return msg ? msg(values) : key;
};
