import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import MultiColumn, {useDataLoader} from '../../src/components/MultiColumn';
import useRandomId from '../../src/hooks/useRandomId';
import useStringFinder from '../../src/hooks/useStringFinder';
import animate from '../../src/functions/animate';
import pageUp from '../../src/functions/pageUp';
import pageDown from '../../src/functions/pageDown';
import addResizeObserver from '../../src/functions/addResizeObserver';
import scrollToItem from '../../src/functions/scrollToItem';

jest.unmock('../../src/components/MultiColumn');

const anyFunction = expect.any(Function);

useRandomId.mockReturnValue('random-id');

describe('MultiColumn', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const path = [0];
			const isLeaf = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true);
			const renderItem = jest.fn().mockReturnValueOnce('item00').mockReturnValueOnce('item01');
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: [2, -1]})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} isLeaf={isLeaf} renderItem={renderItem} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const path = [0];
			const isLeaf = jest.fn().mockReturnValueOnce(false);
			const renderItem = jest.fn().mockReturnValueOnce('item00');
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: [1, -1]})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(
				<MultiColumn id="test" className="TestClass" path={path} isLeaf={isLeaf} renderItem={renderItem} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when focused is true', () => {
			const path = [0];
			const isLeaf = jest.fn().mockReturnValueOnce(false);
			const renderItem = jest.fn().mockReturnValueOnce('item00');
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: [1, -1]})
				.mockReturnValueOnce({current: path});
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([0]);
			const wrapper = shallow(<MultiColumn path={path} isLeaf={isLeaf} renderItem={renderItem} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when path is empty', () => {
			const wrapper = shallow(<MultiColumn path={[]} emptyText="Test empty" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when path is empty and className is set', () => {
			const wrapper = shallow(<MultiColumn className="TestClass" path={[]} emptyText="Test empty" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when an option is clicked', () => {
			const path = [1, 2, 3];
			const onChange = jest.fn();
			const parentNode = {dataset: {index: '1'}};
			const element = {parentNode, dataset: {index: '4'}};
			const closest = jest.fn().mockReturnValueOnce(element);
			const preventDefault = jest.fn();
			const event = {target: {closest}, preventDefault};
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} onChange={onChange} />);
			wrapper.simulate('mousedown', event);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(onChange.mock.calls).toEqual([[[1, 4]]]);
		});

		it('does not call preventDefault when an option is not found', () => {
			const path = [1, 2, 3];
			const closest = jest.fn();
			const preventDefault = jest.fn();
			const event = {target: {closest}, preventDefault};
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} />);
			wrapper.simulate('mousedown', event);
			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('ignores the event when a key is pressed and any modifier is set', () => {
			const path = [0];
			const preventDefault = jest.fn();
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} />);

			wrapper.simulate('keydown', {shiftKey: true, preventDefault});
			wrapper.simulate('keydown', {ctrlKey: true, preventDefault});
			wrapper.simulate('keydown', {altKey: true, preventDefault});
			wrapper.simulate('keydown', {metaKey: true, preventDefault});

			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('calls onChange when page up is pressed', () => {
			const path = [0, 1];
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const child1 = {};
			const current = {children: [null, child1]};
			useRef
				.mockReturnValueOnce({current})
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} onChange={onChange} />);
			pageUp.mockReturnValue(2);
			wrapper.simulate('keydown', {keyCode: 33, preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(pageUp.mock.calls).toEqual([[child1, 1]]);
			expect(onChange.mock.calls).toEqual([[[0, 2]]]);
		});

		it('calls onChange when page down is pressed', () => {
			const path = [0, 1];
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const child1 = {};
			const current = {children: [null, child1]};
			useRef
				.mockReturnValueOnce({current})
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} onChange={onChange} />);
			pageDown.mockReturnValue(2);
			wrapper.simulate('keydown', {keyCode: 34, preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(pageDown.mock.calls).toEqual([[child1, 1]]);
			expect(onChange.mock.calls).toEqual([[[0, 2]]]);
		});

		it('calls onChange when end is pressed', () => {
			const path = [0, 1];
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: [1, 3]})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} isLeaf={jest.fn} renderItem={jest.fn()} onChange={onChange} />);
			wrapper.simulate('keydown', {keyCode: 35, preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(onChange.mock.calls).toEqual([[[0, 2]]]);
		});

		it('calls onChange when home is pressed', () => {
			const path = [0, 1];
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} onChange={onChange} />);
			wrapper.simulate('keydown', {keyCode: 36, preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(onChange.mock.calls).toEqual([[[0, 0]]]);
		});

		it('calls onChange when left is pressed', () => {
			const path = [0, 1];
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} onChange={onChange} />);
			wrapper.simulate('keydown', {keyCode: 37, preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(onChange.mock.calls).toEqual([[[0]]]);
		});

		it('does not call onChange when left is pressed and the path length is 1', () => {
			const path = [0];
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} onChange={onChange} />);
			wrapper.simulate('keydown', {keyCode: 37, preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(onChange).not.toHaveBeenCalled();
		});

		it('calls onChange when up is pressed', () => {
			const path = [0, 1];
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} onChange={onChange} />);
			wrapper.simulate('keydown', {keyCode: 38, preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(onChange.mock.calls).toEqual([[[0, 0]]]);
		});

		it('calls onChange when up is pressed and the current index is 0', () => {
			const path = [0, 0];
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: [1, 3]})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} isLeaf={jest.fn} renderItem={jest.fn()} onChange={onChange} />);
			wrapper.simulate('keydown', {keyCode: 38, preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(onChange.mock.calls).toEqual([[[0, 2]]]);
		});

		it('calls onChange when right is pressed', () => {
			const path = [0];
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: [1, 2]})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} isLeaf={jest.fn} renderItem={jest.fn()} onChange={onChange} />);
			wrapper.simulate('keydown', {keyCode: 39, preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(onChange.mock.calls).toEqual([[[0, 0]]]);
		});

		it('does not call onChange when right is pressed and the path length is equal to the columns length', () => {
			const path = [0];
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: [1]})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} isLeaf={jest.fn} renderItem={jest.fn()} onChange={onChange} />);
			wrapper.simulate('keydown', {keyCode: 39, preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(onChange).not.toHaveBeenCalled();
		});

		it('calls onChange when down is pressed', () => {
			const path = [0, 1];
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: [1, 3]})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} isLeaf={jest.fn} renderItem={jest.fn()} onChange={onChange} />);
			wrapper.simulate('keydown', {keyCode: 40, preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(onChange.mock.calls).toEqual([[[0, 2]]]);
		});

		it('calls onChange when down is pressed and the current index is equal to the column length - 1', () => {
			const path = [0, 2];
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: [1, 3]})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} isLeaf={jest.fn} renderItem={jest.fn()} onChange={onChange} />);
			wrapper.simulate('keydown', {keyCode: 40, preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(onChange.mock.calls).toEqual([[[0, 0]]]);
		});

		it('calls onChange when an alphanumeric is pressed', () => {
			const path = [0, 2];
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const findItemToFocus = jest.fn().mockReturnValue(1);
			const textContent = 'foo';
			const children = [{textContent}];
			const current = {children: [null, {children}]};
			useRef
				.mockReturnValueOnce({current})
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			useStringFinder.mockReturnValue(findItemToFocus);
			const wrapper = shallow(<MultiColumn path={path} onChange={onChange} />);
			wrapper.simulate('keydown', {keyCode: 48, preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(findItemToFocus.mock.calls).toEqual([[48, 2, 1, anyFunction]]);
			expect(onChange.mock.calls).toEqual([[[0, 1]]]);

			expect(findItemToFocus.mock.calls[0][3](0)).toBe('FOO');
		});

		it('calls onChange when an alphanumeric is pressed and findItemToFocus returns -1', () => {
			const path = [0, 2];
			const onChange = jest.fn();
			const preventDefault = jest.fn();
			const findItemToFocus = jest.fn().mockReturnValue(-1);
			const children = [];
			const current = {children: [null, {children}]};
			useRef
				.mockReturnValueOnce({current})
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			useStringFinder.mockReturnValue(findItemToFocus);
			const wrapper = shallow(<MultiColumn path={path} onChange={onChange} />);
			wrapper.simulate('keydown', {keyCode: 48, preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(onChange).not.toHaveBeenCalled();
		});

		it('ignores the event when an unknown key is pressed', () => {
			const path = [0, 2];
			const preventDefault = jest.fn();
			useRef
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			const wrapper = shallow(<MultiColumn path={path} />);

			wrapper.simulate('keydown', {keyCode: 47, preventDefault});
			wrapper.simulate('keydown', {keyCode: 91, preventDefault});

			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('calls setFocused on focus', () => {
			const path = [0];
			const setFocused = jest.fn();
			const contains = jest.fn();
			const live = {};
			const relatedTarget = {test: 'foo'};
			useRef
				.mockReturnValueOnce({current: {contains}})
				.mockReturnValueOnce({current: live})
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			useState.mockReturnValueOnce([false, setFocused]).mockReturnValueOnce([0]);
			const wrapper = shallow(<MultiColumn path={path} />);
			wrapper.simulate('focus', {relatedTarget});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(setFocused.mock.calls).toEqual([[true]]);
			expect(live.textContent).toBe('Use cursor keys to select an item');
		});

		it('does not call setFocused on focus when root contains relatedTarget', () => {
			const path = [0];
			const setFocused = jest.fn();
			const contains = jest.fn().mockReturnValue(true);
			const live = {};
			const relatedTarget = {test: 'foo'};
			useRef
				.mockReturnValueOnce({current: {contains}})
				.mockReturnValueOnce({current: live})
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			useState.mockReturnValueOnce([false, setFocused]).mockReturnValueOnce([0]);
			const wrapper = shallow(<MultiColumn path={path} />);
			wrapper.simulate('focus', {relatedTarget});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(setFocused.mock.calls).toEqual([]);
			expect(live.textContent).toBeUndefined();
		});

		it('calls setFocused on blur', () => {
			const path = [0];
			const setFocused = jest.fn();
			const contains = jest.fn();
			const live = {};
			const relatedTarget = {test: 'foo'};
			useRef
				.mockReturnValueOnce({current: {contains}})
				.mockReturnValueOnce({current: live})
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			useState.mockReturnValueOnce([false, setFocused]).mockReturnValueOnce([0]);
			const wrapper = shallow(<MultiColumn path={path} />);
			wrapper.simulate('blur', {relatedTarget});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(setFocused.mock.calls).toEqual([[false]]);
			expect(live.textContent).toBeNull();
		});

		it('does not call setFocused on blur when root contains relatedTarget', () => {
			const path = [0];
			const setFocused = jest.fn();
			const contains = jest.fn().mockReturnValue(true);
			const live = {};
			const relatedTarget = {test: 'foo'};
			useRef
				.mockReturnValueOnce({current: {contains}})
				.mockReturnValueOnce({current: live})
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			useState.mockReturnValueOnce([false, setFocused]).mockReturnValueOnce([0]);
			const wrapper = shallow(<MultiColumn path={path} />);
			wrapper.simulate('blur', {relatedTarget});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(setFocused.mock.calls).toEqual([]);
			expect(live.textContent).toBeUndefined();
		});

		it('adds an effect which calls focus', () => {
			const path = [0];
			const focus = jest.fn();
			const current = {childNodes: [{childNodes: [{focus}]}]};
			useRef
				.mockReturnValueOnce({current})
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([0]);
			shallow(<MultiColumn path={path} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [path, true]]);

			useEffect.mock.calls[0][0]();
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('adds an effect which does not call focus if focused is false', () => {
			const path = [0];
			const focus = jest.fn();
			const current = {children: [{focus}]};
			useRef
				.mockReturnValueOnce({current})
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			useState.mockReturnValueOnce([false]).mockReturnValueOnce([0]);
			shallow(<MultiColumn path={path} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [path, false]]);

			useEffect.mock.calls[0][0]();
			expect(focus).not.toHaveBeenCalled();
		});

		it('adds an effect which does not call focus if path is empty', () => {
			const path = [];
			const focus = jest.fn();
			const current = {children: [{focus}]};
			useRef
				.mockReturnValueOnce({current})
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			useState.mockReturnValueOnce([true]).mockReturnValueOnce([0]);
			shallow(<MultiColumn path={path} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [path, true]]);

			useEffect.mock.calls[0][0]();
			expect(focus).not.toHaveBeenCalled();
		});

		it('adds an effect which scrolls columns', () => {
			const path = [0];
			const child0 = {};
			const col0 = {children: [child0], getBoundingClientRect: () => ({right: 300, width: 50})};
			const current = {
				scrollLeft: 100,
				scrollWidth: 400,
				children: [col0],
				getBoundingClientRect: () => ({right: 200, width: 100}),
			};
			useRef
				.mockReturnValueOnce({current})
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			shallow(<MultiColumn path={path} />);
			expect(useEffect.mock.calls[1]).toEqual([anyFunction, [path]]);

			useEffect.mock.calls[1][0]();
			expect(scrollToItem.mock.calls).toEqual([[col0, child0]]);
			expect(current.busy).toBe(true);
			expect(animate.mock.calls).toEqual([[150, anyFunction, anyFunction]]);

			animate.mock.calls[0][1](1);
			expect(current.scrollLeft).toBe(300);

			animate.mock.calls[0][2]();
			expect(current.busy).toBe(false);
		});

		it('adds an effect which does not scroll horizontally if busy is true', () => {
			const path = [0];
			const current = {busy: true, children: []};
			useRef
				.mockReturnValueOnce({current})
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			shallow(<MultiColumn path={path} />);
			expect(useEffect.mock.calls[1]).toEqual([anyFunction, [path]]);

			useEffect.mock.calls[1][0]();
			expect(animate).not.toHaveBeenCalled();
		});

		it('adds an effect which does not scroll horizontally if the current column fits', () => {
			const path = [0];
			const col0 = {children: [], getBoundingClientRect: () => ({right: 200, width: 50})};
			const current = {children: [col0], getBoundingClientRect: () => ({right: 200, width: 100})};
			useRef
				.mockReturnValueOnce({current})
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			shallow(<MultiColumn path={path} />);
			expect(useEffect.mock.calls[1]).toEqual([anyFunction, [path]]);

			useEffect.mock.calls[1][0]();
			expect(animate).not.toHaveBeenCalled();
		});

		it('adds an effect which calls addResizeObserver', () => {
			const path = [0];
			const child0 = {};
			const col0 = {children: [child0]};
			const current = {busy: true, children: [col0]};
			useRef
				.mockReturnValueOnce({current})
				.mockReturnValueOnce(null)
				.mockReturnValueOnce({current: []})
				.mockReturnValueOnce({current: path});
			shallow(<MultiColumn path={path} />);
			expect(useEffect.mock.calls[2]).toEqual([anyFunction, [path]]);

			useEffect.mock.calls[2][0]();
			expect(addResizeObserver.mock.calls).toEqual([[current, anyFunction]]);

			addResizeObserver.mock.calls[0][1]();
			expect(scrollToItem.mock.calls).toEqual([[col0, child0]]);
		});
	});

	describe('useDataLoader', () => {
		it('sets columns to null if path is empty', () => {
			const path = [];
			const columnsRef = {};
			const previousPathRef = {};
			useRef.mockReturnValueOnce(columnsRef).mockReturnValueOnce(previousPathRef);
			expect(useDataLoader(path)).toBeNull();
			expect(columnsRef.current).toBeNull();
			expect(previousPathRef.current).toBe(path);
		});

		it('loads column 0 when path changes from empty to not empty', () => {
			const columnsRef = {};
			const getItemCount = jest.fn().mockReturnValueOnce(1);
			const isLeaf = jest.fn().mockReturnValueOnce(true);
			const setUpdateCount = jest.fn();
			const resolve = jest.spyOn(Promise, 'resolve');
			useRef.mockReturnValueOnce(columnsRef).mockReturnValueOnce({current: []});
			useState.mockReturnValueOnce([0, setUpdateCount]);
			expect(useDataLoader([0], getItemCount, isLeaf)).toEqual([-1]);
			expect(columnsRef.current).toEqual([-1]);

			return Promise.all(resolve.mock.results.map(({value}) => value)).then(() => {
				expect(columnsRef.current).toEqual([1]);
				expect(getItemCount.mock.calls).toEqual([[0]]);
				expect(isLeaf.mock.calls).toEqual([[[0]]]);
				expect(setUpdateCount.mock.calls).toEqual([[anyFunction]]);

				expect(setUpdateCount.mock.calls[0][0](0)).toBe(1);
			});
		});

		it('loads columns 0 and 1 when path changes from empty to not empty and item 0,0 is not leaf', () => {
			const columnsRef = {};
			const getItemCount = jest.fn().mockReturnValueOnce(1).mockReturnValueOnce(2);
			const isLeaf = jest.fn().mockReturnValueOnce(false);
			const setUpdateCount = jest.fn();
			const resolve = jest.spyOn(Promise, 'resolve');
			useRef.mockReturnValueOnce(columnsRef).mockReturnValueOnce({current: []});
			useState.mockReturnValueOnce([0, setUpdateCount]);
			expect(useDataLoader([0], getItemCount, isLeaf)).toEqual([-1]);
			expect(columnsRef.current).toEqual([-1]);

			return Promise.all(resolve.mock.results.map(({value}) => value)).then(() => {
				expect(columnsRef.current).toEqual([1, 2]);
				expect(getItemCount.mock.calls).toEqual([[0], [1]]);
				expect(isLeaf.mock.calls).toEqual([[[0]]]);
			});
		});

		it('loads column 1 when path changes from [0] to [1]', () => {
			const columnsRef = {current: [9, 9]};
			const getItemCount = jest.fn().mockReturnValueOnce(1);
			const isLeaf = jest.fn().mockReturnValueOnce(false);
			const setUpdateCount = jest.fn();
			const resolve = jest.spyOn(Promise, 'resolve');
			useRef.mockReturnValueOnce(columnsRef).mockReturnValueOnce({current: [0]});
			useState.mockReturnValueOnce([0, setUpdateCount]);
			expect(useDataLoader([1], getItemCount, isLeaf)).toEqual([9, -1]);
			expect(columnsRef.current).toEqual([9, -1]);

			return Promise.all(resolve.mock.results.map(({value}) => value)).then(() => {
				expect(columnsRef.current).toEqual([9, 1]);
				expect(getItemCount.mock.calls).toEqual([[1]]);
				expect(isLeaf.mock.calls).toEqual([[[1]]]);
			});
		});

		it('does not load any columns when path changes from [0] to [1] and item 0,1 is leaf', () => {
			const columnsRef = {current: [9, 9]};
			const getItemCount = jest.fn().mockReturnValueOnce(1);
			const isLeaf = jest.fn().mockReturnValueOnce(true);
			const setUpdateCount = jest.fn();
			const resolve = jest.spyOn(Promise, 'resolve');
			useRef.mockReturnValueOnce(columnsRef).mockReturnValueOnce({current: [0]});
			useState.mockReturnValueOnce([0, setUpdateCount]);
			expect(useDataLoader([1], getItemCount, isLeaf)).toEqual([9]);
			expect(columnsRef.current).toEqual([9]);
			expect(isLeaf.mock.calls).toEqual([[[1]]]);
			expect(getItemCount).not.toHaveBeenCalled();
			expect(resolve).not.toHaveBeenCalled();
		});

		it('loads column 1 when path changes from [0] to [1] and item 0,0 is leaf', () => {
			const columnsRef = {current: [9]};
			const getItemCount = jest.fn().mockReturnValueOnce(1);
			const isLeaf = jest.fn().mockReturnValueOnce(false);
			const setUpdateCount = jest.fn();
			const resolve = jest.spyOn(Promise, 'resolve');
			useRef.mockReturnValueOnce(columnsRef).mockReturnValueOnce({current: [0]});
			useState.mockReturnValueOnce([0, setUpdateCount]);
			expect(useDataLoader([1], getItemCount, isLeaf)).toEqual([9, -1]);
			expect(columnsRef.current).toEqual([9, -1]);

			return Promise.all(resolve.mock.results.map(({value}) => value)).then(() => {
				expect(columnsRef.current).toEqual([9, 1]);
				expect(getItemCount.mock.calls).toEqual([[1]]);
				expect(isLeaf.mock.calls).toEqual([[[1]]]);
			});
		});

		it('loads column 2 when path changes from [0] to [0,0]', () => {
			const columnsRef = {current: [9, 9]};
			const getItemCount = jest.fn().mockReturnValueOnce(1);
			const isLeaf = jest.fn().mockReturnValueOnce(false);
			const setUpdateCount = jest.fn();
			const resolve = jest.spyOn(Promise, 'resolve');
			useRef.mockReturnValueOnce(columnsRef).mockReturnValueOnce({current: [0]});
			useState.mockReturnValueOnce([0, setUpdateCount]);
			expect(useDataLoader([0, 0], getItemCount, isLeaf)).toEqual([9, 9, -1]);
			expect(columnsRef.current).toEqual([9, 9, -1]);

			return Promise.all(resolve.mock.results.map(({value}) => value)).then(() => {
				expect(columnsRef.current).toEqual([9, 9, 1]);
				expect(getItemCount.mock.calls).toEqual([[2]]);
				expect(isLeaf.mock.calls).toEqual([[[0, 0]]]);
			});
		});

		it('does not load any columns when path changes from [0, 0] to [0]', () => {
			const columnsRef = {current: [9, 9, 9]};
			const getItemCount = jest.fn();
			const isLeaf = jest.fn();
			const setUpdateCount = jest.fn();
			const resolve = jest.spyOn(Promise, 'resolve');
			useRef.mockReturnValueOnce(columnsRef).mockReturnValueOnce({current: [0, 0]});
			useState.mockReturnValueOnce([0, setUpdateCount]);
			expect(useDataLoader([0], getItemCount, isLeaf)).toEqual([9, 9]);
			expect(columnsRef.current).toEqual([9, 9]);
			expect(isLeaf).not.toHaveBeenCalled();
			expect(getItemCount).not.toHaveBeenCalled();
			expect(resolve).not.toHaveBeenCalled();
		});
	});
});
