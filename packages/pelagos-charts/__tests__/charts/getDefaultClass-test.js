import getDefaultClass from '../../src/charts/getDefaultClass';

jest.unmock('../../src/charts/getDefaultClass');

describe('getDefaultClass', () => {
	it('returns expected value', () => {
		expect(getDefaultClass(null, null, null, 'TestClass')).toBe('TestClass');
	});
});
