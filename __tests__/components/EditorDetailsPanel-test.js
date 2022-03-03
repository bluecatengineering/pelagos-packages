import {shallow} from 'enzyme';

import EditorDetailsPanel from '../../src/components/EditorDetailsPanel';
import useSlidingPanel from '../../src/hooks/useSlidingPanel';

jest.unmock('../../src/components/EditorDetailsPanel');

const item = {name: 'Test'};

describe('EditorDetailsPanel', () => {
	describe('rendering', () => {
		it('renders expected elements when showButtons is true', () => {
			const wrapper = shallow(
				<EditorDetailsPanel
					id="test"
					item={item}
					showButtons={true}
					disableEdit="Disable Edit"
					disableDelete="Disable Delete"
					onEdit={jest.fn()}
					onDelete={jest.fn()}
				>
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

		it('renders expected elements with two children', () => {
			const wrapper = shallow(
				<EditorDetailsPanel id="test" item={item}>
					<div />
					<div />
				</EditorDetailsPanel>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements with two children when second child is null', () => {
			const wrapper = shallow(
				<EditorDetailsPanel id="test" item={item}>
					<div />
					{null}
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
	});
});
