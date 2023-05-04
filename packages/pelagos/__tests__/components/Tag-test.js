import {shallow} from 'enzyme';

import Tag from '../../src/components/Tag';

jest.unmock('../../src/components/Tag');

describe('Tag', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<Tag size="sm" type="red">
					red
				</Tag>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<Tag id="test" className="TestClass" size="sm" type="red">
					red
				</Tag>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
