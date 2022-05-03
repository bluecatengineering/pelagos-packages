import {shallow} from 'enzyme';

import SelectNative from '../../src/components/SelectNative';

jest.unmock('../../src/components/SelectNative');

describe('SelectNative', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<SelectNative id="test">
					<option />
				</SelectNative>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<SelectNative id="test" className="TestClass">
					<option />
				</SelectNative>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
