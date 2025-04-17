import extractLineDataFromTidy from '../../src/charts/extractLineDataFromTidy';

jest.unmock('../../src/charts/extractLineDataFromTidy');

const data = [
	{group: 'a', date: 1577854800000, value: 8},
	{group: 'a', date: 1579064400000, value: 1},
	{group: 'a', date: 1580533200000, value: 3},
	{group: 'b', date: 1577854800000, value: 5},
	{group: 'b', date: 1579064400000, value: null},
	{group: 'b', date: 1580533200000, value: 9},
];

describe('extractLineDataFromTidy', () => {
	it('returns expected data', () => {
		expect(extractLineDataFromTidy(data, null, 'group', 'date', 'value')).toEqual({
			groups: new Map([
				['a', [8, 1, 3]],
				['b', [5, null, 9]],
			]),
			groupIndex: new Map([
				['a', 0],
				['b', 1],
			]),
			hintValues: new Map([
				[
					1577854800000,
					[
						['a', 8],
						['b', 5],
					],
				],
				[1579064400000, [['a', 1]]],
				[
					1580533200000,
					[
						['a', 3],
						['b', 9],
					],
				],
			]),
			leftList: [8, 1, 3, 5, 9],
			bottomList: [1577854800000, 1579064400000, 1580533200000],
			pointList: [
				['a', 1577854800000, 8],
				['a', 1579064400000, 1],
				['a', 1580533200000, 3],
				['b', 1577854800000, 5],
				['b', 1580533200000, 9],
			],
		});
	});

	it('returns expected data when selected is set', () => {
		expect(extractLineDataFromTidy(data, ['b'], 'group', 'date', 'value')).toEqual({
			groups: new Map([['b', [5, null, 9]]]),
			groupIndex: new Map([
				['a', 0],
				['b', 1],
			]),
			hintValues: new Map([
				[1577854800000, [['b', 5]]],
				[1580533200000, [['b', 9]]],
			]),
			leftList: [5, 9],
			bottomList: [1577854800000, 1579064400000, 1580533200000],
			pointList: [
				['b', 1577854800000, 5],
				['b', 1580533200000, 9],
			],
		});
	});
});
