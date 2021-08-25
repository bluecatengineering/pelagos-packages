import {shallow} from 'enzyme';

import EditorDetailsPanel from '../../src/components/EditorDetailsPanel';
import useSlidingPanel from '../../src/hooks/useSlidingPanel';

jest.unmock('../../src/components/EditorDetailsPanel');

const item = {name: 'Test'};

describe('EditorDetailsPanel', () => {
	describe('rendering', () => {
		it('renders expected elements when showButtons is true', () => {
			const wrapper = shallow(
				<EditorDetailsPanel id="test" item={item} showButtons={true} onEdit={jest.fn()} onDelete={jest.fn()}>
					<div />
				</EditorDetailsPanel>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when showButtons is false', () => {
			const wrapper = shallow(
				<EditorDetailsPanel id="test" item={item} showButtons={false} onEdit={jest.fn()} onDelete={jest.fn()}>
					<div />
				</EditorDetailsPanel>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when the body has a className', () => {
			const wrapper = shallow(
				<EditorDetailsPanel id="test" item={item} showButtons={true} onEdit={jest.fn()} onDelete={jest.fn()}>
					<div className="BodyClass" />
				</EditorDetailsPanel>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when onDelete is not set', () => {
			const wrapper = shallow(
				<EditorDetailsPanel id="test" item={item} showButtons={true} onEdit={jest.fn()}>
					<div />
				</EditorDetailsPanel>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disableEdit and disableDelete are set', () => {
			const wrapper = shallow(
				<EditorDetailsPanel
					id="test"
					item={item}
					showButtons={true}
					disableEdit="Disable Edit"
					disableDelete="Disable Delete"
					onEdit={jest.fn()}
					onDelete={jest.fn()}>
					<div />
				</EditorDetailsPanel>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('uses useSlidingPanel to handle close', () => {
			const onClose = jest.fn();
			const handler = jest.fn();
			useSlidingPanel.mockReturnValue(handler);
			const wrapper = shallow(
				<EditorDetailsPanel id="test" item={item} onClose={onClose}>
					<div />
				</EditorDetailsPanel>
			);
			expect(useSlidingPanel.mock.calls).toEqual([['test', onClose]]);
			expect(wrapper.find('#closeDetailsPanelBtn').prop('onClick')).toBe(handler);
		});

		it('calls onEdit when the edit button is clicked', () => {
			const onEdit = jest.fn();
			const wrapper = shallow(
				<EditorDetailsPanel id="test" item={item} showButtons={true} onEdit={onEdit}>
					<div />
				</EditorDetailsPanel>
			);
			wrapper.find('#editBtn').prop('onClick')();
			expect(onEdit).toHaveBeenCalled();
		});

		it('calls onDelete when the delete button is clicked', () => {
			const onDelete = jest.fn();
			const wrapper = shallow(
				<EditorDetailsPanel id="test" item={item} showButtons={true} onDelete={onDelete}>
					<div />
				</EditorDetailsPanel>
			);
			wrapper.find('#deleteBtn').prop('onClick')();
			expect(onDelete).toHaveBeenCalled();
		});
	});
});
