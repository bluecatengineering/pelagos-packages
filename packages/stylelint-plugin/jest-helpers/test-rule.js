import {join} from 'path';

import {lint} from 'stylelint';

/* eslint-disable jest/no-standalone-expect */

module.exports = (rule, {ruleName, config: ruleConfig, syntax, accept, reject}) => {
	const config = {
		plugins: [join(__dirname, '../src')],
		rules: {
			[ruleName]: ruleConfig,
		},
	};

	// eslint-disable-next-line jest/valid-title
	describe(ruleName, () => {
		if (accept && accept.length) {
			describe('accept', () => {
				accept.forEach(({code, description, only}) => {
					const spec = only ? it.only : it;
					spec(description || 'no description', () =>
						lint({code, config, syntax}).then((output) => expect(output.results[0].warnings).toEqual([]))
					);
				});
			});
		}

		if (reject && reject.length) {
			describe('reject', () => {
				reject.forEach(({code, description, only, message, line, column}) => {
					const spec = only ? it.only : it;
					spec(description || 'no description', () =>
						lint({code, config, syntax}).then((output) => {
							const warnings = output.results[0].warnings;
							expect(warnings.length).toBeGreaterThanOrEqual(1);

							const warning = warnings[0];
							if (message !== undefined) {
								expect(warning.text).toBe(message);
							}

							if (line !== undefined) {
								expect(warning.line).toBe(line);
							}

							if (column !== undefined) {
								expect(warning.column).toBe(column);
							}
						})
					);
				});
			});
		}
	});
};
