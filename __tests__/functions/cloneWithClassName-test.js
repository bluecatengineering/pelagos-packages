import cloneWithClassName from '../../src/functions/cloneWithClassName';
import addClassName from '../../src/functions/addClassName';

jest.unmock('../../src/functions/cloneWithClassName');

addClassName.mockReturnValue('addClassName');

describe('cloneWithClassName', () => {
	it('returns expected result', () => {
		const element = <div />;
		expect(cloneWithClassName(element, 'TestClass')).toEqual(<div className="addClassName" />);
		expect(addClassName.mock.calls).toEqual([[element, 'TestClass']]);
	});
});
