import extractStackDataFromTidy from '../../src/charts/extractStackDataFromTidy';

jest.unmock('../../src/charts/extractStackDataFromTidy');

const getGroup = (d) => d.group;
const getKey = (d) => d.key;
const getValue = (d) => d.value;

const data = [
	{group: 'a', key: 'foo', value: 8},
	{group: 'a', key: 'bar', value: 1},
	{group: 'b', key: 'foo', value: 5},
	{group: 'b', key: 'bar', value: null},
];

describe('extractStackDataFromTidy', () => {
	it('returns expected data', () => {
		expect(extractStackDataFromTidy(data, null, getGroup, getKey, getValue)).toEqual({
			stackData: new Map([
				[
					'foo',
					new Map([
						['a', 8],
						['b', 5],
					]),
				],
				['bar', new Map([['a', 1]])],
			]),
			groupSet: new Set(['a', 'b']),
			groupIndex: new Map([
				['a', 0],
				['b', 1],
			]),
			hintValues: new Map([
				[
					'foo',
					[
						['a', 8],
						['b', 5],
					],
				],
				['bar', [['a', 1]]],
			]),
			labelSet: new Set(['foo', 'bar']),
		});
	});

	it('returns expected data when selected is set', () => {
		expect(extractStackDataFromTidy(data, ['b'], getGroup, getKey, getValue)).toEqual({
			stackData: new Map([['foo', new Map([['b', 5]])]]),
			groupSet: new Set(['b']),
			groupIndex: new Map([
				['a', 0],
				['b', 1],
			]),
			hintValues: new Map([['foo', [['b', 5]]]]),
			labelSet: new Set(['foo']),
		});
	});
});
