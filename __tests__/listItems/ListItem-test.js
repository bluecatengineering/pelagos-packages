import React from 'react';
import {shallow} from 'enzyme';

import ListItem from '../../src/listItems/ListItem';

jest.unmock('../../src/listItems/ListItem');

describe('ListItem', () => {
	describe('rendering', () => {
		it('renders expected elements when unresolved is false', () => {
			const wrapper = shallow(<ListItem item="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<ListItem item="Test" className="TestClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
