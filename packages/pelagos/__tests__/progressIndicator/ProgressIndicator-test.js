import {shallow} from 'enzyme';

import ProgressIndicator from '../../src/progressIndicator/ProgressIndicator';
import ProgressStep from '../../src/progressIndicator/ProgressStep';

jest.unmock('../../src/progressIndicator/ProgressIndicator');

describe('ProgressIndicator', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<ProgressIndicator current={1}>
					<ProgressStep />
					<ProgressStep />
				</ProgressIndicator>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<ProgressIndicator className="TestClass" current={1}>
					<ProgressStep />
					<ProgressStep />
				</ProgressIndicator>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when there is a single step', () => {
			const wrapper = shallow(
				<ProgressIndicator current={0}>
					<ProgressStep />
				</ProgressIndicator>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('skips empty children', () => {
			const wrapper = shallow(
				<ProgressIndicator current={1}>
					{false}
					<ProgressStep />
					{null}
					<ProgressStep />
				</ProgressIndicator>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when there are no steps', () => {
			const wrapper = shallow(<ProgressIndicator current={0} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
