import {shallow} from 'enzyme';

import ContentSwitcherButton from '../../src/components/ContentSwitcherButton';

jest.unmock('../../src/components/ContentSwitcherButton');

describe('ContentSwitcherButton', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<ContentSwitcherButton text="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(<ContentSwitcherButton id="test" className="TestClass" text="Test" selected />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
