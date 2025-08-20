import {useLayoutEffect, useRef} from 'react';
import {shallow} from 'enzyme';

import ListSelector from '../../src/components/ListSelector';
import moveListItem from '../../src/functions/moveListItem';
import slideUpEffect from '../../src/functions/slideUpEffect';
import slideDownEffect from '../../src/functions/slideDownEffect';
import moveEffect from '../../src/functions/moveEffect';
import useReorder from '../../src/hooks/useReorder';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/components/ListSelector');

const anyFunction = expect.any(Function);
const getElementById = jest.fn();

const emptyText = 'Test empty.';
const allItemsRemovedText = 'Test all items removed.';
const items = ['foo', 'bar'];
const allItems = ['foo', 'bar', 'baz', 'oof'];
const labels = {foo: 'Foo', bar: 'Bar', baz: 'Baz', oof: 'Oof'};
const getLabel = (key) => labels[key];

global.document = {getElementById};

useRandomId.mockReturnValue('random-id');
moveListItem.mockReturnValue('moveListItem');

describe('ListSelector', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useReorder.mockReturnValueOnce([]);
			const wrapper = shallow(
				<ListSelector emptyText={emptyText} items={items} allItems={allItems} getLabel={getLabel} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			useReorder.mockReturnValueOnce([]);
			const wrapper = shallow(
				<ListSelector
					className="TestClass"
					emptyText={emptyText}
					items={items}
					allItems={allItems}
					getLabel={getLabel}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when items is empty', () => {
			useReorder.mockReturnValueOnce([]);
			const wrapper = shallow(
				<ListSelector emptyText={emptyText} items={[]} allItems={allItems} getLabel={getLabel} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('adds an item when a button is clicked on the available list', () => {
			const onChange = jest.fn();
			const parentNode = {nextSibling: 'next', dataset: {key: 'baz'}, getBoundingClientRect: () => 'bounds'};
			const closest = jest.fn().mockReturnValue({parentNode});
			const target = {closest};
			const ref = {};
			useRef.mockReturnValueOnce(ref);
			useReorder.mockReturnValueOnce([]);
			const wrapper = shallow(
				<ListSelector items={items} allItems={allItems} getLabel={getLabel} onChange={onChange} />
			);
			wrapper.find('[role="list"]').last().simulate('click', {target});
			expect(closest.mock.calls).toEqual([['button']]);
			expect(onChange.mock.calls).toEqual([[['foo', 'bar', 'baz']]]);
			expect(ref.current).toEqual({i: 'item-baz', r: 'bounds', u: 'next', m: 'Baz added'});
		});

		it('does not add an item when other element is clicked on the available list', () => {
			const onChange = jest.fn();
			const closest = jest.fn();
			const target = {closest};
			useReorder.mockReturnValueOnce([]);
			const wrapper = shallow(
				<ListSelector items={items} allItems={allItems} getLabel={getLabel} onChange={onChange} />
			);
			wrapper.find('[role="list"]').last().simulate('click', {target});
			expect(closest.mock.calls).toEqual([['button']]);
			expect(onChange.mock.calls).toEqual([]);
		});

		it('removes an item when a button is clicked on the selected list', () => {
			const onChange = jest.fn();
			const parentNode = {nextSibling: 'next', dataset: {key: 'bar'}, getBoundingClientRect: () => 'bounds'};
			const closest = jest.fn().mockReturnValue({parentNode});
			const target = {closest};
			const ref = {};
			useRef.mockReturnValueOnce(ref);
			useReorder.mockReturnValueOnce([]);
			getElementById.mockReturnValue({parentNode: 'parent'});
			const wrapper = shallow(
				<ListSelector items={items} allItems={allItems} getLabel={getLabel} onChange={onChange} />
			);
			wrapper.find('[role="list"]').first().simulate('click', {target});
			expect(closest.mock.calls).toEqual([['button']]);
			expect(onChange.mock.calls).toEqual([[['foo']]]);
			expect(getElementById.mock.calls).toEqual([['item-baz']]);
			expect(ref.current).toEqual({i: 'item-bar', r: 'bounds', u: 'next', d: 'parent', m: 'Bar removed'});
		});

		it('removes an item when a button is clicked on the selected list and there is only one item', () => {
			const items = ['bar'];
			const onChange = jest.fn();
			const parentNode = {nextSibling: 'next', dataset: {key: 'bar'}, getBoundingClientRect: () => 'bounds'};
			const closest = jest.fn().mockReturnValue({parentNode});
			const target = {closest};
			const ref = {};
			useRef.mockReturnValueOnce(ref);
			useReorder.mockReturnValueOnce([]);
			getElementById.mockReturnValue({parentNode: 'parent'});
			const wrapper = shallow(
				<ListSelector
					allItemsRemovedText={allItemsRemovedText}
					items={items}
					allItems={allItems}
					getLabel={getLabel}
					onChange={onChange}
				/>
			);
			wrapper.find('[role="list"]').first().simulate('click', {target});
			expect(closest.mock.calls).toEqual([['button']]);
			expect(onChange.mock.calls).toEqual([[[]]]);
			expect(getElementById.mock.calls).toEqual([['item-baz']]);
			expect(ref.current).toEqual({
				i: 'item-bar',
				r: 'bounds',
				u: 'next',
				d: 'parent',
				m: 'Bar removed. Test all items removed.',
			});
		});

		it('does not remove an item when other element is clicked on the selected list', () => {
			const onChange = jest.fn();
			const closest = jest.fn();
			const target = {closest};
			useReorder.mockReturnValueOnce([]);
			const wrapper = shallow(
				<ListSelector items={items} allItems={allItems} getLabel={getLabel} onChange={onChange} />
			);
			wrapper.find('[role="list"]').first().simulate('click', {target});
			expect(closest.mock.calls).toEqual([['button']]);
			expect(onChange.mock.calls).toEqual([]);
		});

		it('adds a reorder handler', () => {
			const onChange = jest.fn();

			useReorder.mockReturnValueOnce([]);

			shallow(<ListSelector items={items} allItems={allItems} getLabel={getLabel} onChange={onChange} />);
			expect(useReorder.mock.calls).toEqual([
				['.ListSelector__entry', '.ListSelector__name', 2, anyFunction, anyFunction],
			]);
			expect(useReorder.mock.calls[0][3]({dataset: {index: '0'}})).toBe('Foo');
			useReorder.mock.calls[0][4](0, 1);
			expect(onChange.mock.calls).toEqual([['moveListItem']]);
			expect(moveListItem.mock.calls).toEqual([[items, 0, 1]]);
		});

		it('adds a layout effect which does not do anything if animations is null', () => {
			const ref = {};
			useRef.mockReturnValueOnce(ref);
			useReorder.mockReturnValueOnce([]);
			shallow(<ListSelector items={items} allItems={allItems} getLabel={getLabel} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction]);
			useLayoutEffect.mock.calls[0][0]();
			expect(ref.current).toBeUndefined();
		});

		it('adds a layout effect which calls expected effects', () => {
			const ref = {current: {i: 'i', r: 'r', u: 'u', d: 'd', m: 'm'}};
			const live = {};
			const focus = jest.fn();
			useRef.mockReturnValueOnce(ref);
			useReorder.mockReturnValueOnce([null, {current: live}]);
			getElementById.mockReturnValue({parentNode: 'parent', previousSibling: {focus}});
			shallow(<ListSelector items={items} allItems={allItems} getLabel={getLabel} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction]);
			useLayoutEffect.mock.calls[0][0]();
			expect(ref.current).toBeNull();
			expect(getElementById.mock.calls).toEqual([['i']]);
			expect(slideUpEffect.mock.calls).toEqual([['u']]);
			expect(slideDownEffect.mock.calls).toEqual([['d']]);
			expect(moveEffect.mock.calls).toEqual([['parent', 'r']]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(live.textContent).toBe('m');
		});

		it('adds a layout effect which calls expected effects if optional fields are not set', () => {
			const ref = {current: {i: 'i', r: 'r', m: 'm'}};
			const live = {};
			const focus = jest.fn();
			useRef.mockReturnValueOnce(ref);
			useReorder.mockReturnValueOnce([null, {current: live}]);
			getElementById.mockReturnValue({parentNode: 'parent', nextSibling: {focus}});
			shallow(<ListSelector items={items} allItems={allItems} getLabel={getLabel} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction]);
			useLayoutEffect.mock.calls[0][0]();
			expect(ref.current).toBeNull();
			expect(getElementById.mock.calls).toEqual([['i']]);
			expect(slideUpEffect.mock.calls).toEqual([]);
			expect(slideDownEffect.mock.calls).toEqual([]);
			expect(moveEffect.mock.calls).toEqual([['parent', 'r']]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(live.textContent).toBe('m');
		});
	});
});
