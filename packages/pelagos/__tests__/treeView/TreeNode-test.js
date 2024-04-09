import {useContext, useRef} from 'react';
import {shallow} from 'enzyme';

import TreeNode from '../../src/treeView/TreeNode';

jest.unmock('../../src/treeView/TreeNode');

describe('TreeNode', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useContext.mockReturnValueOnce({}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			useContext.mockReturnValueOnce({}).mockReturnValueOnce({level: 0, padding: 0, hasIcon: true});
			const wrapper = shallow(
				<TreeNode id="test-id" labelClassName="TestClass" label="Test" icon="test-icon" expanded>
					children
				</TreeNode>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when expanded is false', () => {
			useContext.mockReturnValueOnce({}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded={false} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when loading is set', () => {
			useContext.mockReturnValueOnce({}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" loading expanded={false} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when label is not a string', () => {
			useContext.mockReturnValueOnce({}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label={<span />} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when focused equals id', () => {
			useContext.mockReturnValueOnce({focused: 'test-id'}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onSelect when the node is clicked', () => {
			const onSelect = jest.fn();
			const setFocused = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({onSelect, setFocused}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('click', {stopPropagation});
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onSelect.mock.calls).toEqual([['test-id']]);
			expect(setFocused.mock.calls).toEqual([['test-id']]);
		});

		it('calls onToggle when the toggle icon is clicked', () => {
			const onToggle = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded={false} onToggle={onToggle} />);
			wrapper.find('.TreeView__iconWrapper').simulate('click', {stopPropagation});
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onToggle.mock.calls).toEqual([['test-id', true]]);
		});

		it('calls onSelect when either Enter or Space are pressed', () => {
			const onSelect = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({onSelect}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'Enter', preventDefault, stopPropagation});
			wrapper.simulate('keydown', {key: ' ', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[], []]);
			expect(stopPropagation.mock.calls).toEqual([[], []]);
			expect(onSelect.mock.calls).toEqual([['test-id'], ['test-id']]);
		});

		it('does not call onSelect when Enter is pressed and id equals selected', () => {
			const onSelect = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({selected: 'test-id', onSelect}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'Enter', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onSelect.mock.calls).toEqual([]);
		});

		it('calls onToggle when ArrowLeft is pressed and expanded is true', () => {
			const onToggle = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded onToggle={onToggle} />);
			wrapper.simulate('keydown', {key: 'ArrowLeft', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onToggle.mock.calls).toEqual([['test-id', false]]);
		});

		it('calls setFocused when ArrowLeft is pressed, expanded is not true and level is not 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({current: {parentNode: {parentNode: {id: 'parent-id', focus}}}});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 1, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowLeft', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([['parent-id']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('does not call setFocused when ArrowLeft is pressed, expanded is not true and level is 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useRef.mockReturnValueOnce({current: {}});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowLeft', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([]);
		});

		it('calls onToggle when ArrowRight is pressed and expanded is false', () => {
			const onToggle = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded={false} onToggle={onToggle} />);
			wrapper.simulate('keydown', {key: 'ArrowRight', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onToggle.mock.calls).toEqual([['test-id', true]]);
		});

		it('calls setFocused when ArrowRight is pressed and expanded is true', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({current: {lastChild: {firstChild: {id: 'child-id', focus}}}});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded />);
			wrapper.simulate('keydown', {key: 'ArrowRight', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([['child-id']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('does not call setFocused when ArrowRight is pressed and expanded is undefined', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useRef.mockReturnValueOnce({current: {}});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowRight', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([]);
		});

		it('calls setFocused when ArrowUp is pressed and the previous sibling aria-expanded is true', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const getAttribute = jest
				.fn()
				.mockReturnValueOnce('true')
				.mockReturnValueOnce('true')
				.mockReturnValueOnce('false');
			const focus = jest.fn();
			useRef.mockReturnValueOnce({
				current: {
					previousSibling: {
						getAttribute,
						lastChild: {lastChild: {getAttribute, lastChild: {lastChild: {id: 'child-id', getAttribute, focus}}}},
					},
				},
			});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowUp', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-expanded'], ['aria-expanded'], ['aria-expanded']]);
			expect(setFocused.mock.calls).toEqual([['child-id']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when ArrowUp is pressed and the previous sibling aria-expanded is not true', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const getAttribute = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({
				current: {previousSibling: {getAttribute, id: 'sibling-id', focus}},
			});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowUp', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-expanded']]);
			expect(setFocused.mock.calls).toEqual([['sibling-id']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when ArrowUp is pressed and previous sibling is null and level is not 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({
				current: {parentNode: {parentNode: {id: 'parent-id', focus}}},
			});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 1, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowUp', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([['parent-id']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('does not call setFocused when ArrowUp is pressed and previous sibling is null and level is 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useRef.mockReturnValueOnce({
				current: {},
			});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowUp', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([]);
		});

		it('calls setFocused when ArrowDown is pressed and expanded is true', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({
				current: {lastChild: {firstChild: {id: 'child-id', focus}}},
			});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded />);
			wrapper.simulate('keydown', {key: 'ArrowDown', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([['child-id']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when ArrowDown is pressed and expanded is not true', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({
				current: {nextSibling: {id: 'sibling-id', focus}},
			});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowDown', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([['sibling-id']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when ArrowDown is pressed, expanded is not true, nextSibling is null, and level is not 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({
				current: {parentNode: {parentNode: {parentNode: {parentNode: {nextSibling: {id: 'sibling-id', focus}}}}}},
			});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 2, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowDown', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([['sibling-id']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('does not call setFocused when ArrowDown is pressed, expanded is not true, nextSibling is null, level is not 0, and the parent nextSibling is null', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useRef.mockReturnValueOnce({
				current: {parentNode: {parentNode: {}}},
			});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 1, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowDown', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([]);
		});

		it('does not call setFocused when ArrowDown is pressed, expanded is not true, nextSibling is null, and level is 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useRef.mockReturnValueOnce({
				current: {},
			});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowDown', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([]);
		});

		it('calls setFocused when Home is pressed and level is 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({
				current: {parentNode: {firstChild: {id: 'child-id', focus}}},
			});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'Home', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([['child-id']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('does not call setFocused when Home is pressed and level is not 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useRef.mockReturnValueOnce({
				current: {},
			});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 1, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'Home', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([]);
			expect(stopPropagation.mock.calls).toEqual([]);
			expect(setFocused.mock.calls).toEqual([]);
		});

		it('calls setFocused when End is pressed and level is 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('true').mockReturnValueOnce('true').mockReturnValueOnce();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({
				current: {
					parentNode: {
						lastChild: {
							getAttribute,
							lastChild: {lastChild: {getAttribute, lastChild: {lastChild: {id: 'child-id', focus, getAttribute}}}},
						},
					},
				},
			});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'End', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-expanded'], ['aria-expanded'], ['aria-expanded']]);
			expect(setFocused.mock.calls).toEqual([['child-id']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('does not call setFocused when End is pressed and level is not 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useRef.mockReturnValueOnce({
				current: {},
			});
			useContext.mockReturnValueOnce({setFocused}).mockReturnValueOnce({level: 1, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'End', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([]);
			expect(stopPropagation.mock.calls).toEqual([]);
			expect(setFocused.mock.calls).toEqual([]);
		});

		it('calls onToggle when - is pressed and expanded is true', () => {
			const onToggle = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded onToggle={onToggle} />);
			wrapper.simulate('keydown', {key: '-', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onToggle.mock.calls).toEqual([['test-id', false]]);
		});

		it('does not call onToggle when - is pressed and expanded is not true', () => {
			const onToggle = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" onToggle={onToggle} />);
			wrapper.simulate('keydown', {key: '-', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onToggle.mock.calls).toEqual([]);
		});

		it('calls onToggle when + is pressed and expanded is false', () => {
			const onToggle = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded={false} onToggle={onToggle} />);
			wrapper.simulate('keydown', {key: '+', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onToggle.mock.calls).toEqual([['test-id', true]]);
		});

		it('does not call onToggle when + is pressed and expanded is true', () => {
			const onToggle = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded onToggle={onToggle} />);
			wrapper.simulate('keydown', {key: '+', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onToggle.mock.calls).toEqual([]);
		});

		it('ignores event if any modifier is set', () => {
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({}).mockReturnValueOnce({level: 0, padding: 0});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'Enter', ctrlKey: true, preventDefault, stopPropagation});
			wrapper.simulate('keydown', {key: 'Enter', altKey: true, preventDefault, stopPropagation});
			wrapper.simulate('keydown', {key: 'Enter', metaKey: true, preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([]);
			expect(stopPropagation.mock.calls).toEqual([]);
		});
	});
});
