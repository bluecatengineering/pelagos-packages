import React from 'react';
import {shallow} from 'enzyme';

import Toast from '../../src/components/Toast';

jest.unmock('../../src/components/Toast');

describe('Toast', () => {
	describe('rendering', () => {
		it('renders all messages', () => {
			const messages = [{type: 'a', text: 'Test 1'}, {type: 'b', text: 'Test 2'}];
			const wrapper = shallow(<Toast messages={messages} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
