import {shallow} from 'enzyme';

import InlineNotification from '../../src/components/InlineNotification';

jest.unmock('../../src/components/InlineNotification');

describe('InlineNotification', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<InlineNotification type="info" text="Test of notification" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when title is set', () => {
			const wrapper = shallow(<InlineNotification type="info" title="Test title" text="Test of notification" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
