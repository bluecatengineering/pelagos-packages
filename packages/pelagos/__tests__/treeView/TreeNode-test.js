import {useContext, useEffect, useRef} from 'react';
import {shallow} from 'enzyme';

import TreeNode from '../../src/treeView/TreeNode';

jest.unmock('../../src/treeView/TreeNode');

const anyFunction = expect.any(Function);

describe('TreeNode', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useContext.mockReturnValueOnce({focused: []}).mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			useContext
				.mockReturnValueOnce({selected: ['parent-id', 'test-id'], focused: []})
				.mockReturnValueOnce({level: 1, padding: 0, parentPath: ['parent-id'], hasIcon: true});
			const wrapper = shallow(
				<TreeNode id="test-id" labelClassName="TestClass" label="Test" icon="test-icon" expanded>
					children
				</TreeNode>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when expanded is false', () => {
			useContext.mockReturnValueOnce({focused: []}).mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded={false} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when expanded is false and selected matches partially', () => {
			useContext
				.mockReturnValueOnce({selected: ['parent-id', 'test-id', 'child-id'], focused: []})
				.mockReturnValueOnce({level: 1, padding: 0, parentPath: ['parent-id']});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded={false} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when loading is set', () => {
			useContext.mockReturnValueOnce({focused: []}).mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" loading expanded={false} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when label is not a string', () => {
			useContext.mockReturnValueOnce({focused: []}).mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label={<span />} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when focused equals path', () => {
			useContext
				.mockReturnValueOnce({focused: ['test-id']})
				.mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('adds an effect which calls setFocused when focused is a child node', () => {
			const focused = ['test-id', 'child-id'];
			const setFocused = jest.fn();
			useContext.mockReturnValueOnce({focused, setFocused}).mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			shallow(<TreeNode id="test-id" label="Test" />);
			expect(useEffect.mock.calls[0]).toEqual([
				anyFunction,
				[1, undefined, focused, 'test-id', 0, ['test-id'], setFocused],
			]);

			useEffect.mock.calls[0][0]();
			expect(setFocused.mock.calls).toEqual([[['test-id']]]);
		});

		it('adds an effect which does not call setFocused when focused is not a child node', () => {
			const focused = ['other-id'];
			const setFocused = jest.fn();
			useContext.mockReturnValueOnce({focused, setFocused}).mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			shallow(<TreeNode id="test-id" label="Test" />);
			expect(useEffect.mock.calls[0]).toEqual([
				anyFunction,
				[1, undefined, focused, 'test-id', 0, ['test-id'], setFocused],
			]);

			useEffect.mock.calls[0][0]();
			expect(setFocused.mock.calls).toEqual([]);
		});

		it('calls onSelect when the node is clicked', () => {
			const onSelect = jest.fn();
			const setFocused = jest.fn();
			const stopPropagation = jest.fn();
			useContext
				.mockReturnValueOnce({focused: [], onSelect, setFocused})
				.mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('click', {stopPropagation});
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onSelect.mock.calls).toEqual([[['test-id']]]);
			expect(setFocused.mock.calls).toEqual([[['test-id']]]);
		});

		it('calls onToggle when the toggle icon is clicked', () => {
			const onToggle = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({focused: []}).mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded={false} onToggle={onToggle} />);
			wrapper.find('.TreeView__iconWrapper').simulate('click', {stopPropagation});
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onToggle.mock.calls).toEqual([[]]);
		});

		it('calls onSelect when either Enter or Space are pressed', () => {
			const onSelect = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useContext
				.mockReturnValueOnce({focused: [], onSelect})
				.mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'Enter', preventDefault, stopPropagation});
			wrapper.simulate('keydown', {key: ' ', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[], []]);
			expect(stopPropagation.mock.calls).toEqual([[], []]);
			expect(onSelect.mock.calls).toEqual([[['test-id']], [['test-id']]]);
		});

		it('does not call onSelect when Enter is pressed and id equals selected', () => {
			const onSelect = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useContext
				.mockReturnValueOnce({selected: ['test-id'], focused: [], onSelect})
				.mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
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
			useContext.mockReturnValueOnce({focused: []}).mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded onToggle={onToggle} />);
			wrapper.simulate('keydown', {key: 'ArrowLeft', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onToggle.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when ArrowLeft is pressed, expanded is not true and level is not 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('tree');
			const focus = jest.fn();
			useRef.mockReturnValueOnce({
				current: {parentNode: {getAttribute, parentNode: {id: 'parent-id', focus, parentNode: {getAttribute}}}},
			});
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 1, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowLeft', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['role']]);
			expect(setFocused.mock.calls).toEqual([[['parent-id']]]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('does not call setFocused when ArrowLeft is pressed, expanded is not true and level is 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useRef.mockReturnValueOnce({current: {}});
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
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
			useContext.mockReturnValueOnce({focused: []}).mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded={false} onToggle={onToggle} />);
			wrapper.simulate('keydown', {key: 'ArrowRight', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onToggle.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when ArrowRight is pressed and expanded is true', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('group').mockReturnValueOnce('tree');
			const focus = jest.fn();
			const current = {
				id: 'test-id',
				parentNode: {getAttribute},
				lastChild: {getAttribute, firstChild: {id: 'child-id', focus}},
			};
			useRef.mockReturnValueOnce({current});
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			current.lastChild.parentNode = current;
			current.lastChild.firstChild.parentNode = current.lastChild;
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded />);
			wrapper.simulate('keydown', {key: 'ArrowRight', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['role'], ['role']]);
			expect(setFocused.mock.calls).toEqual([[['test-id', 'child-id']]]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('does not call setFocused when ArrowRight is pressed and expanded is undefined', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useRef.mockReturnValueOnce({current: {}});
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
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
				.mockReturnValueOnce('false')
				.mockReturnValueOnce('group')
				.mockReturnValueOnce('group')
				.mockReturnValueOnce('tree');
			const focus = jest.fn();
			const current = {
				previousSibling: {
					id: 'id-0',
					getAttribute,
					parentNode: {getAttribute},
					lastChild: {
						getAttribute,
						lastChild: {
							id: 'id-1',
							getAttribute,
							lastChild: {getAttribute, lastChild: {id: 'id-2', getAttribute, focus}},
						},
					},
				},
			};
			useRef.mockReturnValueOnce({current});
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			current.previousSibling.lastChild.parentNode = current.previousSibling;
			current.previousSibling.lastChild.lastChild.parentNode = current.previousSibling.lastChild;
			current.previousSibling.lastChild.lastChild.lastChild.parentNode = current.previousSibling.lastChild.lastChild;
			current.previousSibling.lastChild.lastChild.lastChild.lastChild.parentNode =
				current.previousSibling.lastChild.lastChild.lastChild;
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowUp', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([
				['aria-expanded'],
				['aria-expanded'],
				['aria-expanded'],
				['role'],
				['role'],
				['role'],
			]);
			expect(setFocused.mock.calls).toEqual([[['id-0', 'id-1', 'id-2']]]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when ArrowUp is pressed and previous sibling is null and level is not 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('tree');
			const focus = jest.fn();
			useRef.mockReturnValueOnce({
				current: {parentNode: {parentNode: {id: 'parent-id', focus, parentNode: {getAttribute}}}},
			});
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 1, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowUp', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['role']]);
			expect(setFocused.mock.calls).toEqual([[['parent-id']]]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('does not call setFocused when ArrowUp is pressed and previous sibling is null and level is 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useRef.mockReturnValueOnce({
				current: {},
			});
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
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
			const getAttribute = jest.fn().mockReturnValueOnce('group').mockReturnValueOnce('tree');
			const focus = jest.fn();
			const current = {
				id: 'test-id',
				parentNode: {getAttribute},
				lastChild: {getAttribute, firstChild: {id: 'child-id', focus}},
			};
			useRef.mockReturnValueOnce({current});
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			current.lastChild.parentNode = current;
			current.lastChild.firstChild.parentNode = current.lastChild;
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded />);
			wrapper.simulate('keydown', {key: 'ArrowDown', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['role'], ['role']]);
			expect(setFocused.mock.calls).toEqual([[['test-id', 'child-id']]]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when ArrowDown is pressed and expanded is not true', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('tree');
			const focus = jest.fn();
			useRef.mockReturnValueOnce({
				current: {nextSibling: {id: 'sibling-id', focus, parentNode: {getAttribute}}},
			});
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowDown', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['role']]);
			expect(setFocused.mock.calls).toEqual([[['sibling-id']]]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when ArrowDown is pressed, expanded is not true, nextSibling is null, and level is not 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('tree');
			const focus = jest.fn();
			useRef.mockReturnValueOnce({
				current: {
					parentNode: {
						parentNode: {
							parentNode: {parentNode: {nextSibling: {id: 'sibling-id', focus, parentNode: {getAttribute}}}},
						},
					},
				},
			});
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 2, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'ArrowDown', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['role']]);
			expect(setFocused.mock.calls).toEqual([[['sibling-id']]]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('does not call setFocused when ArrowDown is pressed, expanded is not true, nextSibling is null, level is not 0, and the parent nextSibling is null', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useRef.mockReturnValueOnce({
				current: {parentNode: {parentNode: {}}},
			});
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 1, padding: 0, parentPath: []});
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
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
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
			const getAttribute = jest.fn().mockReturnValueOnce('tree');
			const focus = jest.fn();
			useRef.mockReturnValueOnce({
				current: {parentNode: {firstChild: {id: 'child-id', focus, parentNode: {getAttribute}}}},
			});
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'Home', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['role']]);
			expect(setFocused.mock.calls).toEqual([[['child-id']]]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('does not call setFocused when Home is pressed and level is not 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useRef.mockReturnValueOnce({
				current: {},
			});
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 1, padding: 0, parentPath: []});
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
			const getAttribute = jest
				.fn()
				.mockReturnValueOnce('true')
				.mockReturnValueOnce('true')
				.mockReturnValueOnce()
				.mockReturnValueOnce('group')
				.mockReturnValueOnce('group')
				.mockReturnValueOnce('tree');
			const focus = jest.fn();
			const current = {
				parentNode: {
					getAttribute,
					lastChild: {
						id: 'id-0',
						getAttribute,
						lastChild: {
							getAttribute,
							lastChild: {
								id: 'id-1',
								getAttribute,
								lastChild: {getAttribute, lastChild: {id: 'id-2', focus, getAttribute}},
							},
						},
					},
				},
			};
			useRef.mockReturnValueOnce({current});
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			current.parentNode.lastChild.parentNode = current.parentNode;
			current.parentNode.lastChild.lastChild.parentNode = current.parentNode.lastChild;
			current.parentNode.lastChild.lastChild.lastChild.parentNode = current.parentNode.lastChild.lastChild;
			current.parentNode.lastChild.lastChild.lastChild.lastChild.parentNode =
				current.parentNode.lastChild.lastChild.lastChild;
			current.parentNode.lastChild.lastChild.lastChild.lastChild.lastChild.parentNode =
				current.parentNode.lastChild.lastChild.lastChild.lastChild;
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'End', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([
				['aria-expanded'],
				['aria-expanded'],
				['aria-expanded'],
				['role'],
				['role'],
				['role'],
			]);
			expect(setFocused.mock.calls).toEqual([[['id-0', 'id-1', 'id-2']]]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('does not call setFocused when End is pressed and level is not 0', () => {
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useRef.mockReturnValueOnce({
				current: {},
			});
			useContext
				.mockReturnValueOnce({focused: [], setFocused})
				.mockReturnValueOnce({level: 1, padding: 0, parentPath: []});
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
			useContext.mockReturnValueOnce({focused: []}).mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded onToggle={onToggle} />);
			wrapper.simulate('keydown', {key: '-', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onToggle.mock.calls).toEqual([[]]);
		});

		it('does not call onToggle when - is pressed and expanded is not true', () => {
			const onToggle = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({focused: []}).mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
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
			useContext.mockReturnValueOnce({focused: []}).mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded={false} onToggle={onToggle} />);
			wrapper.simulate('keydown', {key: '+', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onToggle.mock.calls).toEqual([[]]);
		});

		it('does not call onToggle when + is pressed and expanded is true', () => {
			const onToggle = jest.fn();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({focused: []}).mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" expanded onToggle={onToggle} />);
			wrapper.simulate('keydown', {key: '+', preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onToggle.mock.calls).toEqual([]);
		});

		it('ignores event if any modifier is set', () => {
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({focused: []}).mockReturnValueOnce({level: 0, padding: 0, parentPath: []});
			const wrapper = shallow(<TreeNode id="test-id" label="Test" />);
			wrapper.simulate('keydown', {key: 'Enter', ctrlKey: true, preventDefault, stopPropagation});
			wrapper.simulate('keydown', {key: 'Enter', altKey: true, preventDefault, stopPropagation});
			wrapper.simulate('keydown', {key: 'Enter', metaKey: true, preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([]);
			expect(stopPropagation.mock.calls).toEqual([]);
		});
	});
});
