import {shallow} from 'enzyme';

import EditorDetailsPanel from '../../src/components/EditorDetailsPanel';
import useSlidingPanel from '../../src/hooks/useSlidingPanel';
import cloneWithClassName from '../../src/functions/cloneWithClassName';

jest.unmock('../../src/components/EditorDetailsPanel');

const item = {name: 'Test'};

cloneWithClassName.mockReturnValue('cloneWithClassName');

describe('EditorDetailsPanel', () => {
	describe('rendering', () => {
		it('renders expected elements when showButtons is true', () => {
			const body = <div />;
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
					{body}
				</EditorDetailsPanel>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(cloneWithClassName.mock.calls).toEqual([[body, 'EditorDetailsPanel__body']]);
		});

		it('renders expected elements when showButtons is false', () => {
			const wrapper = shallow(
				<EditorDetailsPanel id="test" item={item} showButtons={false} onEdit={jest.fn()} onDelete={jest.fn()}>
					<div />
				</EditorDetailsPanel>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements with two children', () => {
			const body = <div />;
			const buttons = <div />;
			const wrapper = shallow(
				<EditorDetailsPanel id="test" item={item}>
					{body}
					{buttons}
				</EditorDetailsPanel>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(cloneWithClassName.mock.calls).toEqual([
				[body, 'EditorDetailsPanel__body'],
				[buttons, 'EditorDetailsPanel__buttons'],
			]);
		});

		it('renders expected elements with two children when second child is null', () => {
			const body = <div />;
			const wrapper = shallow(
				<EditorDetailsPanel id="test" item={item}>
					{body}
					{null}
				</EditorDetailsPanel>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(cloneWithClassName.mock.calls).toEqual([[body, 'EditorDetailsPanel__body']]);
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
