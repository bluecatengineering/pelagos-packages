import {scaleBand, scaleLinear, scaleLog, scaleTime} from 'd3-scale';

import createScale from '../../src/charts/createScale';

jest.unmock('../../src/charts/createScale');

const band = {
	domain: jest.fn().mockReturnThis(),
	rangeRound: jest.fn().mockReturnThis(),
	paddingInner: jest.fn().mockReturnThis(),
	paddingOuter: jest.fn().mockReturnThis(),
};
scaleBand.mockReturnValue(band);

const linear = {
	domain: jest.fn().mockReturnThis(),
	rangeRound: jest.fn().mockReturnThis(),
	nice: jest.fn().mockReturnThis(),
};
scaleLinear.mockReturnValue(linear);

const log = {
	domain: jest.fn().mockReturnThis(),
	rangeRound: jest.fn().mockReturnThis(),
	nice: jest.fn().mockReturnThis(),
};
scaleLog.mockReturnValue(log);

const time = {
	domain: jest.fn().mockReturnThis(),
	rangeRound: jest.fn().mockReturnThis(),
};
scaleTime.mockReturnValue(time);

describe('createScale', () => {
	it('returns a labels scale', () => {
		expect(createScale('labels', 'test-domain', 'test-range', 0.25)).toBe(band);
		expect(band.domain.mock.calls).toEqual([['test-domain']]);
		expect(band.rangeRound.mock.calls).toEqual([['test-range']]);
		expect(band.paddingInner.mock.calls).toEqual([[1]]);
		expect(band.paddingOuter.mock.calls).toEqual([[0.25]]);
	});

	it('returns a linear scale', () => {
		expect(createScale('linear', 'test-domain', 'test-range')).toBe(linear);
		expect(linear.domain.mock.calls).toEqual([['test-domain']]);
		expect(linear.rangeRound.mock.calls).toEqual([['test-range']]);
		expect(linear.nice.mock.calls).toEqual([[]]);
	});

	it('returns a log scale', () => {
		expect(createScale('log', 'test-domain', 'test-range')).toBe(log);
		expect(log.domain.mock.calls).toEqual([['test-domain']]);
		expect(log.rangeRound.mock.calls).toEqual([['test-range']]);
		expect(log.nice.mock.calls).toEqual([[]]);
	});

	it('returns a time scale', () => {
		expect(createScale('time', 'test-domain', 'test-range')).toBe(time);
		expect(time.domain.mock.calls).toEqual([['test-domain']]);
		expect(time.rangeRound.mock.calls).toEqual([['test-range']]);
	});
});
