import {shallow} from 'enzyme';
import React from 'react';

import Suggestion from '../../src/suggestions/Suggestion';

jest.unmock('../../src/suggestions/Suggestion');

describe('Suggestion', () => {
	it('renders expected elements', () => {
		const wrapper = shallow(<Suggestion id="0" name="Test" description="test" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('renders expected elements when className is set', () => {
		const wrapper = shallow(<Suggestion id="0" className="TestClass" name="Test" description="test" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
