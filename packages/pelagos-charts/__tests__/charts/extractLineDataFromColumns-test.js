import extractLineDataFromColumns from '../../src/charts/extractLineDataFromColumns';

jest.unmock('../../src/charts/extractLineDataFromColumns');

describe('extractLineDataFromColumns', () => {
	it('returns expected data', () => {
		const labels = [1, 2, 3];
		const groups = [
			['a', [9, 8, 7]],
			['b', [6, null, 4]],
		];
		expect(extractLineDataFromColumns({labels, groups})).toEqual({
			groups: new Map(groups),
			groupIndex: new Map([
				['a', 0],
				['b', 1],
			]),
			hintValues: new Map([
				[
					1,
					[
						['a', 9],
						['b', 6],
					],
				],
				[2, [['a', 8]]],
				[
					3,
					[
						['a', 7],
						['b', 4],
					],
				],
			]),
			leftList: [9, 6, 8, 7, 4],
			bottomList: labels,
			pointList: [
				['a', 1, 9],
				['b', 1, 6],
				['a', 2, 8],
				['a', 3, 7],
				['b', 3, 4],
			],
		});
	});

	it('returns expected data when bottomList is not set', () => {
		expect(extractLineDataFromColumns({})).toEqual({
			groups: new Map(),
			groupIndex: new Map(),
			hintValues: new Map(),
			leftList: [],
			pointList: [],
		});
	});

	it('returns expected data when selectedGroups is set', () => {
		const labels = [1, 2, 3];
		const groups = [
			['a', [9, 8, 7]],
			['b', [6, null, 4]],
		];
		expect(extractLineDataFromColumns({labels, groups}, ['b'])).toEqual({
			groups: new Map([groups[1]]),
			groupIndex: new Map([
				['a', 0],
				['b', 1],
			]),
			hintValues: new Map([
				[1, [['b', 6]]],
				[2, []],
				[3, [['b', 4]]],
			]),
			leftList: [6, 4],
			bottomList: labels,
			pointList: [
				['b', 1, 6],
				['b', 3, 4],
			],
		});
	});
});
