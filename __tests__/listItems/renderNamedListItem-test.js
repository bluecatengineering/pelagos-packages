import renderNamedListItem from '../../src/listItems/renderNamedListItem';

jest.unmock('../../src/listItems/renderNamedListItem');

describe('renderNamedListItem', () => {
	it('renders expected elements', () => {
		expect(renderNamedListItem({id: 'Test', name: 'Test'}, 'TestClass')).toMatchSnapshot();
	});

	it('renders expected elements when name and className are not passed in', () => {
		expect(renderNamedListItem({id: 'Test'})).toMatchSnapshot();
	});
});
