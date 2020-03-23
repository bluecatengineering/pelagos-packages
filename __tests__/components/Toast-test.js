import React from 'react';
import {shallow} from 'enzyme';

import Toast from '../../src/components/Toast';
import {hasFatalError} from '../../src/toasts/ToastFunctions';

jest.unmock('../../src/components/Toast');

describe('Toast', () => {
	describe('rendering', () => {
		it('renders all messages', () => {
			const messages = [
				{type: 'a', text: 'Test 1'},
				{type: 'b', text: 'Test 2'},
			];
			const wrapper = shallow(<Toast messages={messages} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders modal backdrop when hasFatalError returns true', () => {
			const messages = [{}];
			hasFatalError.mockReturnValue(true);
			const wrapper = shallow(<Toast messages={messages} />);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(hasFatalError.mock.calls).toEqual([[messages]]);
		});
	});
});
