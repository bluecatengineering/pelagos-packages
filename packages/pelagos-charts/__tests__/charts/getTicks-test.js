import getTicks from '../../src/charts/getTicks';

jest.unmock('../../src/charts/getTicks');

describe('getTicks', () => {
	it('returns expected value when scaleType does not implement ticks', () => {
		const list = ['a', 'b'];
		expect(getTicks({domain: () => list})).toBe(list);
	});

	it('returns expected value when scaleType implements ticks', () => {
		const ticks = jest.fn().mockReturnValue([1, 2, 3]);
		const domain = jest.fn().mockReturnValue([0, 4]);
		expect(getTicks({ticks, domain}, 10)).toEqual([1, 2, 3]);
		expect(ticks.mock.calls).toEqual([[10]]);
	});

	it('returns expected value when scaleType implements ticks and the last label is on the domain limit', () => {
		const ticks = jest.fn().mockReturnValue([1, 2, 3]);
		const domain = jest.fn().mockReturnValue([0, 3]);
		expect(getTicks({ticks, domain}, 10)).toEqual([1, 2]);
	});
});
