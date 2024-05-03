import extractStackDataFromColumns from '../../src/charts/extractStackDataFromColumns';

jest.unmock('../../src/charts/extractStackDataFromColumns');

describe('extractStackDataFromColumns', () => {
	it('returns expected data', () => {
		const labels = ['a', 'b'];
		const groups = [
			['One', [9, 8]],
			['Two', [6, null]],
		];
		expect(extractStackDataFromColumns({labels, groups})).toEqual({
			stackData: new Map([
				[
					'a',
					new Map([
						['One', 9],
						['Two', 6],
					]),
				],
				['b', new Map([['One', 8]])],
			]),
			groupSet: new Set(['One', 'Two']),
			groupIndex: new Map([
				['One', 0],
				['Two', 1],
			]),
			hintValues: new Map([
				[
					'a',
					[
						['One', 9],
						['Two', 6],
					],
				],
				['b', [['One', 8]]],
			]),
			labelSet: labels,
		});
	});

	it('returns expected data when labelSet is not set', () => {
		expect(extractStackDataFromColumns({})).toEqual({
			stackData: new Map(),
			groupSet: new Set(),
			groupIndex: new Map(),
			hintValues: new Map(),
		});
	});

	it('returns expected data when selectedGroups is set', () => {
		const labels = ['a', 'b'];
		const groups = [
			['One', [9, 8]],
			['Two', [6, null]],
		];
		expect(extractStackDataFromColumns({labels, groups}, ['Two'])).toEqual({
			stackData: new Map([
				['a', new Map([['Two', 6]])],
				['b', new Map([])],
			]),
			groupSet: new Set(['Two']),
			groupIndex: new Map([
				['One', 0],
				['Two', 1],
			]),
			hintValues: new Map([
				['a', [['Two', 6]]],
				['b', []],
			]),
			labelSet: labels,
		});
	});
});
