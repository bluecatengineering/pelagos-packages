import identity from 'lodash-es/identity';

import hintFormatters from '../../src/charts/hintFormatters';

jest.unmock('../../src/charts/hintFormatters');

jest.mock('d3-format', () => ({format: (fmt) => `format-${fmt}`}));

describe('hintFormatters', () => {
	it('returns expected formatter for labels', () => {
		expect(hintFormatters.labels).toBe(identity);
	});

	it('returns expected formatter for linear', () => {
		expect(hintFormatters.linear).toBe('format-.3s');
	});

	it('returns expected formatter for log', () => {
		expect(hintFormatters.log).toBe('format-.3s');
	});

	it('returns expected formatter for time', () => {
		expect(hintFormatters.time(1577854800000)).toBe('Jan 1, 2020');
	});
});
