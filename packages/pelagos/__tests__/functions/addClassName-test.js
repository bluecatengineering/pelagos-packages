import addClassName from '../../src/functions/addClassName';

jest.unmock('../../src/functions/addClassName');

describe('addClassName', () => {
	it('returns expected result when the element has a className', () => {
		expect(addClassName({props: {className: 'ElementClass'}}, 'TestClass')).toBe('ElementClass TestClass');
	});

	it('returns expected result when the element does not have a className', () => {
		expect(addClassName({props: {}}, 'TestClass')).toBe('TestClass');
	});
});
