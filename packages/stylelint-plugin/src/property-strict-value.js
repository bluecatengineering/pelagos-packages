'use strict';

const {readFileSync} = require('fs');
const {join} = require('path');

const {parse} = require('yaml');
const {
	utils: {ruleMessages, validateOptions, report},
} = require('stylelint');

const ruleName = '@bluecateng/property-strict-value';

const messages = ruleMessages(ruleName, {
	expected: (name) => `Value for property "${name}" is not valid`,
});

const declFilter = /color|background|border|outline|margin|padding|font|text-transform|grid(-(row|column))?-gap/;

const loadColors = () =>
	Object.entries(
		parse(
			readFileSync(
				process.env.NODE_ENV === 'test'
					? join(__dirname, '../defs/colors.yaml')
					: // istanbul ignore next
					  require.resolve('@bluecateng/pelagos/defs/colors.yaml'),
				'utf8'
			)
		)
	).flatMap(([k, {value, palette, normal, hover, css}]) => {
		const result = [];
		if (value) {
			result.push(`@${k}`);
		}
		if (Array.isArray(palette)) {
			const n = palette.length;
			for (let i = 0; i < n; ++i) {
				result.push(`@${k}${10 + i * 10}`);
			}
		}
		if (normal) {
			const name = css || k;
			const n = normal.length;
			for (let i = 0; i < n; ++i) {
				result.push(`@${name}-${10 + i * 10}`);
			}
		}
		if (hover) {
			const name = css || k;
			const n = hover.length;
			for (let i = 0; i < n; ++i) {
				result.push(`@${name}-${10 + i * 10}-hover`);
			}
		}
		return result;
	});

const isColorFunction = (value) => {
	if (/^var\(/.test(value)) {
		return true;
	}

	const r = /^fade\(([^,]+), \d+%\)$/.exec(value);
	return r && isValidColor(r[1]);
};

const buildValidator = (validValues, f) => (value) => validValues.includes(value) || (f && f(value));
const isValidColor = buildValidator(
	loadColors().concat('transparent', 'currentcolor', 'currentColor', 'inherit'),
	isColorFunction
);
const isValidSpacing = buildValidator(
	Object.keys(
		parse(
			readFileSync(
				process.env.NODE_ENV === 'test'
					? join(__dirname, '../defs/spacing.yaml')
					: // istanbul ignore next
					  require.resolve('@bluecateng/pelagos/defs/spacing.yaml'),
				'utf8'
			)
		)
	)
		.map((k) => `@${k}`)
		.concat('auto', '0'),
	(value) => /^(-(\d+(px|em|vw|vh|%)|@.+)|\d+(vw|vh))$/.test(value)
);

const isValidBorder = (value) =>
	/^0|(\d+(px|em))|none|hidden|dotted|dashed|solid|double$/.test(value) || isValidColor(value);

const count = (token, char) => {
	const length = token.length;
	let count = 0;
	for (let i = 0; i < length; ++i) {
		if (token[i] === char) {
			++count;
		}
	}
	return count;
};

const isValidBackground = (value) => {
	let result;
	const regExp = /[^\s,]+/g;
	while ((result = regExp.exec(value)) !== null) {
		let token = result[0];
		while (count(token, '(') !== count(token, ')') && (result = regExp.exec(value)) !== null) {
			token += ' ' + result[0];
		}
		if (
			!/^(\/|none|left|center|right|top|bottom|auto|cover|contain|repeat-x|repeat-y|repeat|space|round|no-repeat|scroll|fixed|local|border-box|padding-box|content-box|url\(.*|image\(.*|image-set\(.*|element\(.*|cross-fade\(.*|(\d+(px|em|%)))$/.test(
				token
			) &&
			!isValidColor(token)
		) {
			return false;
		}
	}
	return true;
};

const plugin = (actual) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, {actual});

	// istanbul ignore if
	if (!validOptions || !actual) {
		return;
	}

	root.walkDecls(declFilter, (node) => {
		const {prop, value, lastEach} = node;
		if (/^--/.test(prop)) {
			return;
		}

		if (
			/^(background-|(border-(left|right|top|bottom)-)|outline-|scrollbar-[a-z]+-)?color$/.test(prop) &&
			isValidColor(value)
		) {
			return;
		}

		if (/(border|scrollbar)-color/.test(prop) && value.split(' ').every(isValidColor)) {
			return;
		}

		if (/^(border(-left|-right|-top|-bottom)?)|outline$/.test(prop) && value.split(' ').every(isValidBorder)) {
			return;
		}

		if (
			/^border(-left|-right|-top|-bottom)?-(image|style|width|radius|collapse)|outline-(offset|style|width)|background-(attachment|clip|image|origin|position|repeat|size)/.test(
				prop
			)
		) {
			return;
		}

		if (prop === 'background' && isValidBackground(value)) {
			return;
		}

		if (/^(margin|padding)-(left|right|top|bottom)$/.test(prop) && isValidSpacing(value)) {
			return;
		}

		if (/^grid-(row|column)-gap$/.test(prop) && isValidSpacing(value)) {
			return;
		}

		if (/^(margin|padding|grid-gap)$/.test(prop) && value.split(' ').every(isValidSpacing)) {
			return;
		}

		if (value === 'inherit' || prop === 'font-size') {
			return;
		}

		report({
			index: lastEach,
			message: messages.expected(prop),
			node,
			ruleName,
			result,
		});
	});
};

plugin.ruleName = ruleName;
plugin.messages = messages;

module.exports = plugin;
