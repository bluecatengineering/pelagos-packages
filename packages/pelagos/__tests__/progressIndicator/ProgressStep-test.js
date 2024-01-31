import {shallow} from 'enzyme';

import ProgressStep from '../../src/progressIndicator/ProgressStep';

jest.unmock('../../src/progressIndicator/ProgressStep');

describe('ProgressStep', () => {
	describe('rendering', () => {
		it('renders expected elements for current', () => {
			const wrapper = shallow(<ProgressStep label="Foo" complete={false} current={true} invalid={false} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements for completed step', () => {
			const wrapper = shallow(<ProgressStep label="Foo" complete={true} current={false} invalid={false} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements for invalid step', () => {
			const wrapper = shallow(<ProgressStep label="Foo" complete={false} current={false} invalid={true} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements for invalid current step', () => {
			const wrapper = shallow(<ProgressStep label="Foo" complete={false} current={true} invalid={true} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements for next step', () => {
			const wrapper = shallow(<ProgressStep label="Foo" complete={false} current={false} invalid={false} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
