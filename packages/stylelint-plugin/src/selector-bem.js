'use strict';

const {
	utils: {ruleMessages, validateOptions, report},
} = require('stylelint');
const isStandardSyntaxRule = require('stylelint/lib/utils/isStandardSyntaxRule');

const ruleName = '@bluecateng/selector-bem';

const messages = ruleMessages(ruleName, {
	expected: (value) => `Expected selector "${value}" to follow BEM notation`,
});

const plugin = (actual) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, {actual});

	// istanbul ignore if
	if (!validOptions || !actual) {
		return;
	}

	root.walkRules((rule) => {
		if (!isStandardSyntaxRule(rule)) {
			return;
		}

		rule.selector.split(/[ ,>]/).forEach((part) => {
			if (
				part &&
				part.charAt(0) === '.' &&
				!/^.[A-Z][A-Za-z0-9]+(:|\[|$)/.test(part) &&
				!/^.[A-Z][A-Za-z0-9]+__[a-z][A-Za-z0-9]+(:|\[|$)/.test(part) &&
				!/^.[A-Z][A-Za-z0-9]+--[a-z][A-Za-z0-9]+(:|\[|$)/.test(part) &&
				!/^.[A-Z][A-Za-z0-9]+__[a-z][A-Za-z0-9]+--[a-z][A-Za-z0-9]+(:|\[|$)/.test(part)
			) {
				report({
					index: rule.lastEach,
					message: messages.expected(part),
					node: rule,
					ruleName,
					result,
				});
			}
		});
	});
};

plugin.ruleName = ruleName;
plugin.messages = messages;

module.exports = plugin;
