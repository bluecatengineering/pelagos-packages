import {shallow} from 'enzyme';

import ListItem from '../../src/listItems/ListItem';

jest.unmock('../../src/listItems/ListItem');

describe('ListItem', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<ListItem item="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(<ListItem item="Test" className="TestClass" unresolved />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
