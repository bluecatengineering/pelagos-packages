import {shallow} from 'enzyme';

import InfoTooltip from '../../src/components/InfoTooltip';

jest.unmock('../../src/components/InfoTooltip');

describe('InfoTooltip', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<InfoTooltip text="Text" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<InfoTooltip id="test" className="TestClass" text="Text" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
