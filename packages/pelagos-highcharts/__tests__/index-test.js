import {buildColorSetClass} from '../src';

jest.unmock('../src/index');

describe('buildColorSetClass', () => {
	it('returns expected result when count is in range', () => {
		expect(buildColorSetClass('TestClass', 1)).toBe('highcharts-set-1-0 TestClass');
		expect(buildColorSetClass('TestClass', 5, 1)).toBe('highcharts-set-5-1 TestClass');
		expect(buildColorSetClass('', 3, 2)).toBe('highcharts-set-3-2');
	});

	it('returns expected result when count is out of range', () => {
		expect(buildColorSetClass('TestClass')).toBe('TestClass');
		expect(buildColorSetClass('TestClass', 0)).toBe('TestClass');
		expect(buildColorSetClass('TestClass', 6)).toBe('TestClass');
	});
});
