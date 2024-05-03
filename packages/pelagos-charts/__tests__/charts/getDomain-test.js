import {extent} from 'd3-array';

import getDomain from '../../src/charts/getDomain';
import extendDomain from '../../src/charts/extendDomain';

jest.unmock('../../src/charts/getDomain');

extent.mockReturnValue('extent');
extendDomain.mockReturnValue('extendDomain');

describe('getDomain', () => {
	it('returns expected result when domain is set', () => {
		expect(getDomain('test-domain')).toBe('test-domain');
	});

	it('returns expected result when scaleType is labels', () => {
		expect(getDomain(null, 'labels', 'test-list')).toBe('test-list');
	});

	it('returns expected result when scaleType is linear', () => {
		expect(getDomain(null, 'linear', 'test-list')).toBe('extendDomain');
		expect(extent.mock.calls).toEqual([['test-list']]);
		expect(extendDomain.mock.calls).toEqual([['extent']]);
	});

	it('returns expected result when scaleType is other value', () => {
		expect(getDomain(null, 'time', 'test-list')).toBe('extent');
		expect(extent.mock.calls).toEqual([['test-list']]);
	});
});
