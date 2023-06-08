import {shallow} from 'enzyme';

import Tag from '../../src/components/Tag';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/components/Tag');

useRandomId.mockReturnValue('random-id');

describe('Tag', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<Tag>gray</Tag>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<Tag id="test" className="TestClass" size="sm" type="red" onClick={jest.fn()}>
					red
				</Tag>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when onRemove is ser', () => {
			const wrapper = shallow(
				<Tag removeTitle="Remove title" onRemove={jest.fn()}>
					gray
				</Tag>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
