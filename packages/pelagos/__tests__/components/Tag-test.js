import {shallow} from 'enzyme';

import Tag from '../../src/components/Tag';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/components/Tag');

useRandomId.mockReturnValue('random-id');

describe('Tag', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<Tag text="gray" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<Tag
					id="test"
					className="TestClass"
					size="sm"
					type="red"
					icon="test-icon"
					tagTitle="Test tag title"
					onClick={jest.fn()}>
					red
				</Tag>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when onRemove is ser', () => {
			const wrapper = shallow(<Tag text="gray" removeTitle="Remove title" onRemove={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
