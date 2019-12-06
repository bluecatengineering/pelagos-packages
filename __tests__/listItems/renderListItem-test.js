import renderListItem from '../../src/listItems/renderListItem';

jest.unmock('../../src/listItems/renderListItem');

describe('renderListItem', () => {
	it('renders expected elements', () => {
		expect(renderListItem('Test', 'TestClass')).toMatchSnapshot();
	});
});
