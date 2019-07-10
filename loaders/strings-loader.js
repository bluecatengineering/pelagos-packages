const yaml = require('js-yaml');
const parser = require('intl-messageformat-parser');

module.exports = function(source) {
	const strings = yaml.safeLoad(source);
	const messages = {};
	Object.entries(strings).forEach(([k, v]) => (messages[k] = parser.parse(v)));
	return 'module.exports = ' + JSON.stringify(messages, undefined, 2) + ';';
};
