const yaml = require('js-yaml');
const parser = require('intl-messageformat-parser');

// Remove the location attribute of all nodes recursively
const prune = node => {
	delete node.location;
	Object.keys(node).forEach(key => {
		const value = node[key];
		if (value) {
			if (Array.isArray(value)) {
				value.forEach(item => {
					if (item && typeof item === 'object') {
						prune(item);
					}
				});
			} else if (typeof value === 'object') {
				prune(value);
			}
		}
	});
	return node;
};

module.exports = function(source) {
	const strings = yaml.safeLoad(source);
	const messages = {};
	Object.keys(strings).forEach(k => (messages[k] = prune(parser.parse(strings[k]))));
	return 'module.exports = ' + JSON.stringify(messages, undefined, 2) + ';';
};
