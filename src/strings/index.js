import MsgFormat from 'intl-messageformat';

const messages = Object.entries(require('./en.strings.yml')).reduce(
	(o, [k, v]) => ((o[k] = new MsgFormat(v, 'en')), o),
	{}
);

export default (key, values) => {
	const msg = messages[key];
	return msg ? msg.format(values) : key;
};
