import hideChild from '../../src/table/hideChild';

jest.unmock('../../src/table/hideChild');

describe('hideChild', () => {
	it('returns undefined when child is undefined', () => {
		expect(hideChild(undefined, 0)).toBeUndefined();
	});

	it('returns expected element when key is set', () => {
		expect(hideChild(<div key="test" />, 0)).toMatchSnapshot();
	});

	it('returns expected element when key is not set', () => {
		expect(hideChild(<div />, 0)).toMatchSnapshot();
	});
});
