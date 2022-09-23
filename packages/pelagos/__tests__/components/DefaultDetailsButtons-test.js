import {shallow} from 'enzyme';

import DefaultDetailsButtons from '../../src/components/DefaultDetailsButtons';

jest.unmock('../../src/components/DefaultDetailsButtons');

const item = {name: 'Test'};

describe('DefaultDetailsButtons', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<DefaultDetailsButtons className="TestClass" item={item} onEdit={jest.fn()} onDelete={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when onDelete is not set', () => {
			const wrapper = shallow(<DefaultDetailsButtons item={item} onEdit={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disableEdit and disableDelete are set', () => {
			const wrapper = shallow(
				<DefaultDetailsButtons
					item={item}
					disableEdit="Disable Edit"
					disableDelete="Disable Delete"
					onEdit={jest.fn()}
					onDelete={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onEdit when the edit button is clicked', () => {
			const onEdit = jest.fn();
			const wrapper = shallow(<DefaultDetailsButtons item={item} onEdit={onEdit} />);
			wrapper.find('#editBtn').prop('onClick')();
			expect(onEdit).toHaveBeenCalled();
		});

		it('calls onDelete when the delete button is clicked', () => {
			const onDelete = jest.fn();
			const wrapper = shallow(<DefaultDetailsButtons item={item} onDelete={onDelete} />);
			wrapper.find('#deleteBtn').prop('onClick')();
			expect(onDelete).toHaveBeenCalled();
		});
	});
});
