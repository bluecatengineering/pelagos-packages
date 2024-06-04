import {useLayoutEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import ListSelectorDialog from '../../src/components/ListSelectorDialog';
import moveListItem from '../../src/functions/moveListItem';
import slideUpEffect from '../../src/functions/slideUpEffect';
import slideDownEffect from '../../src/functions/slideDownEffect';
import moveEffect from '../../src/functions/moveEffect';
import useReorder from '../../src/hooks/useReorder';

jest.unmock('../../src/components/ListSelectorDialog');

const anyFunction = expect.any(Function);
const getElementById = jest.fn();
const querySelectorAll = jest.fn();

const title = 'Test title';
const emptyText = 'Test empty.';
const allItemsRemovedText = 'Test all items removed.';
const saveText = 'Test save';
const items = ['foo', 'bar'];
const allItems = ['foo', 'bar', 'baz', 'oof'];
const headers = {foo: 'Foo', bar: 'Bar', baz: 'Baz', oof: 'Oof'};
const getLabel = (key) => headers[key];

global.document = {getElementById, querySelectorAll};

moveListItem.mockReturnValue('moveListItem');

describe('ListSelectorDialog', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useReorder.mockReturnValueOnce([]);
			const wrapper = shallow(
				<ListSelectorDialog
					title={title}
					emptyText={emptyText}
					saveText={saveText}
					items={items}
					allItems={allItems}
					getLabel={getLabel}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when defaultItems is set', () => {
			useReorder.mockReturnValueOnce([]);
			const wrapper = shallow(
				<ListSelectorDialog
					title={title}
					emptyText={emptyText}
					saveText={saveText}
					items={items}
					allItems={allItems}
					defaultItems={items}
					getLabel={getLabel}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when items is empty', () => {
			useReorder.mockReturnValueOnce([]);
			const wrapper = shallow(
				<ListSelectorDialog
					title={title}
					emptyText={emptyText}
					saveText={saveText}
					items={[]}
					allItems={allItems}
					getLabel={getLabel}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('adds an item when a button is clicked on the available list', () => {
			const setItems = jest.fn();
			const parentNode = {nextSibling: 'next', dataset: {key: 'baz'}, getBoundingClientRect: () => 'bounds'};
			const closest = jest.fn().mockReturnValue({parentNode});
			const target = {closest};
			const live = {};
			const ref = {};
			useRef.mockReturnValueOnce(ref);
			useState.mockReturnValueOnce([items, setItems]);
			useReorder.mockReturnValueOnce([null, {current: live}]);
			const wrapper = shallow(<ListSelectorDialog items={items} allItems={allItems} getLabel={getLabel} />);
			wrapper.find('[role="list"]').first().simulate('click', {target});
			expect(closest.mock.calls).toEqual([['button']]);
			expect(setItems.mock.calls).toEqual([[anyFunction]]);
			expect(setItems.mock.calls[0][0](items)).toEqual(['foo', 'bar', 'baz']);
			expect(live.textContent).toBe('Baz added');
			expect(ref.current).toEqual({t: 1, i: 'item-baz', r: 'bounds', u: 'next'});
		});

		it('does not add an item when other element is clicked on the available list', () => {
			const setItems = jest.fn();
			const closest = jest.fn();
			const target = {closest};
			const live = {};
			useState.mockReturnValueOnce([items, setItems]);
			useReorder.mockReturnValueOnce([null, {current: live}]);
			const wrapper = shallow(<ListSelectorDialog items={items} allItems={allItems} getLabel={getLabel} />);
			wrapper.find('[role="list"]').first().simulate('click', {target});
			expect(closest.mock.calls).toEqual([['button']]);
			expect(setItems).not.toHaveBeenCalled();
			expect(live.textContent).toBeUndefined();
		});

		it('removes an item when a button is clicked on the selected list', () => {
			const setItems = jest.fn();
			const parentNode = {nextSibling: 'next', dataset: {key: 'bar'}, getBoundingClientRect: () => 'bounds'};
			const closest = jest.fn().mockReturnValue({parentNode});
			const target = {closest};
			const live = {};
			const ref = {};
			useRef.mockReturnValueOnce(ref);
			useState.mockReturnValueOnce([items, setItems]);
			useReorder.mockReturnValueOnce([null, {current: live}]);
			getElementById.mockReturnValue({parentNode: 'parent'});
			const wrapper = shallow(<ListSelectorDialog items={items} allItems={allItems} getLabel={getLabel} />);
			wrapper.find('[role="list"]').last().simulate('click', {target});
			expect(closest.mock.calls).toEqual([['button']]);
			expect(setItems.mock.calls).toEqual([[anyFunction]]);
			expect(setItems.mock.calls[0][0](items)).toEqual(['foo']);
			expect(live.textContent).toBe('Bar removed');
			expect(getElementById.mock.calls).toEqual([['item-baz']]);
			expect(ref.current).toEqual({t: 1, i: 'item-bar', r: 'bounds', u: 'next', d: 'parent'});
		});

		it('removes an item when a button is clicked on the selected list and there is only one item', () => {
			const items = ['bar'];
			const setItems = jest.fn();
			const parentNode = {nextSibling: 'next', dataset: {key: 'bar'}, getBoundingClientRect: () => 'bounds'};
			const closest = jest.fn().mockReturnValue({parentNode});
			const target = {closest};
			const live = {};
			const ref = {};
			useRef.mockReturnValueOnce(ref);
			useState.mockReturnValueOnce([items, setItems]);
			useReorder.mockReturnValueOnce([null, {current: live}]);
			getElementById.mockReturnValue({parentNode: 'parent'});
			const wrapper = shallow(
				<ListSelectorDialog
					allItemsRemovedText={allItemsRemovedText}
					items={items}
					allItems={allItems}
					getLabel={getLabel}
				/>
			);
			wrapper.find('[role="list"]').last().simulate('click', {target});
			expect(closest.mock.calls).toEqual([['button']]);
			expect(setItems.mock.calls).toEqual([[anyFunction]]);
			expect(setItems.mock.calls[0][0](items)).toEqual([]);
			expect(live.textContent).toBe('Bar removed. Test all items removed.');
			expect(getElementById.mock.calls).toEqual([['item-baz']]);
			expect(ref.current).toEqual({t: 1, i: 'item-bar', r: 'bounds', u: 'next', d: 'parent'});
		});

		it('does not remove an item when other element is clicked on the selected list', () => {
			const setItems = jest.fn();
			const closest = jest.fn();
			const target = {closest};
			const live = {};
			useState.mockReturnValueOnce([items, setItems]);
			useReorder.mockReturnValueOnce([null, {current: live}]);
			const wrapper = shallow(<ListSelectorDialog items={items} allItems={allItems} getLabel={getLabel} />);
			wrapper.find('[role="list"]').last().simulate('click', {target});
			expect(closest.mock.calls).toEqual([['button']]);
			expect(setItems).not.toHaveBeenCalled();
			expect(live.textContent).toBeUndefined();
		});

		it('restores default values when the restore button is clicked', () => {
			const defaultItems = ['baz'];
			const setItems = jest.fn();
			const live = {};
			const ref = {};
			useRef.mockReturnValueOnce(ref);
			useState.mockReturnValueOnce([items, setItems]);
			useReorder.mockReturnValueOnce([null, {current: live}]);
			querySelectorAll.mockReturnValue([
				{getBoundingClientRect: () => 'r-foo', dataset: {key: 'foo'}},
				{getBoundingClientRect: () => 'r-bar', dataset: {key: 'bar'}},
			]);
			const wrapper = shallow(
				<ListSelectorDialog items={items} allItems={allItems} defaultItems={defaultItems} getLabel={getLabel} />
			);
			wrapper.find('[size="small"]').simulate('click');
			expect(setItems.mock.calls).toEqual([[defaultItems]]);
			expect(live.textContent).toBe('The default settings have been restored.');
			expect(querySelectorAll.mock.calls).toEqual([['.ListSelectorDialog__list > *']]);
			expect(ref.current).toEqual({
				t: 2,
				m: new Map([
					['foo', 'r-foo'],
					['bar', 'r-bar'],
				]),
			});
		});

		it('calls onClose when the close button is clicked', () => {
			const onClose = jest.fn();
			useReorder.mockReturnValueOnce([]);
			const wrapper = shallow(
				<ListSelectorDialog items={items} allItems={allItems} getLabel={getLabel} onClose={onClose} />
			);
			wrapper.find('#closeDialogBtn').simulate('click');
			expect(onClose.mock.calls).toEqual([[]]);
		});

		it('calls onSave when the update button is clicked', () => {
			const onSave = jest.fn();
			useState.mockReturnValueOnce([items]);
			useReorder.mockReturnValueOnce([]);
			const wrapper = shallow(
				<ListSelectorDialog items={items} allItems={allItems} getLabel={getLabel} onSave={onSave} />
			);
			wrapper.find('#saveItemsBtn').simulate('click');
			expect(onSave.mock.calls).toEqual([[items]]);
		});

		it('adds a reorder handler', () => {
			const setItems = jest.fn();

			useState.mockReturnValueOnce([items, setItems]);
			useReorder.mockReturnValueOnce([]);

			shallow(<ListSelectorDialog items={items} allItems={allItems} getLabel={getLabel} />);
			expect(useReorder.mock.calls).toEqual([
				['.ListSelectorDialog__entry', '.ListSelectorDialog__name', 2, anyFunction, anyFunction],
			]);
			expect(useReorder.mock.calls[0][3]({dataset: {index: '0'}})).toBe('Foo');
			useReorder.mock.calls[0][4](0, 1);
			expect(setItems.mock.calls).toEqual([['moveListItem']]);
			expect(moveListItem.mock.calls).toEqual([[items, 0, 1]]);
		});

		it('adds a layout effect which does not do anything if animations is null', () => {
			const ref = {};
			useRef.mockReturnValueOnce(ref);
			useReorder.mockReturnValueOnce([]);
			shallow(<ListSelectorDialog items={items} allItems={allItems} getLabel={getLabel} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction]);
			useLayoutEffect.mock.calls[0][0]();
			expect(ref.current).toBeUndefined();
		});

		it('adds a layout effect which calls expected effects if t is 1', () => {
			const ref = {current: {t: 1, i: 'i', r: 'r', u: 'u', d: 'd'}};
			useRef.mockReturnValueOnce(ref);
			useReorder.mockReturnValueOnce([]);
			getElementById.mockReturnValue({parentNode: 'parent'});
			shallow(<ListSelectorDialog items={items} allItems={allItems} getLabel={getLabel} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction]);
			useLayoutEffect.mock.calls[0][0]();
			expect(ref.current).toBeNull();
			expect(getElementById.mock.calls).toEqual([['i']]);
			expect(slideUpEffect.mock.calls).toEqual([['u']]);
			expect(slideDownEffect.mock.calls).toEqual([['d']]);
			expect(moveEffect.mock.calls).toEqual([['parent', 'r']]);
		});

		it('adds a layout effect which calls expected effects if t is 1 and optional fields are not set', () => {
			const ref = {current: {t: 1, i: 'i', r: 'r'}};
			useRef.mockReturnValueOnce(ref);
			useReorder.mockReturnValueOnce([]);
			getElementById.mockReturnValue({parentNode: 'parent'});
			shallow(<ListSelectorDialog items={items} allItems={allItems} getLabel={getLabel} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction]);
			useLayoutEffect.mock.calls[0][0]();
			expect(ref.current).toBeNull();
			expect(getElementById.mock.calls).toEqual([['i']]);
			expect(slideUpEffect.mock.calls).toEqual([]);
			expect(slideDownEffect.mock.calls).toEqual([]);
			expect(moveEffect.mock.calls).toEqual([['parent', 'r']]);
		});

		it('adds a layout effect which calls expected effects if t is 2', () => {
			const ref = {current: {t: 2, m: new Map([['foo', 'r-foo']])}};
			const element = {dataset: {key: 'foo'}};
			useRef.mockReturnValueOnce(ref);
			useReorder.mockReturnValueOnce([]);
			querySelectorAll.mockReturnValue([element]);
			shallow(<ListSelectorDialog items={items} allItems={allItems} getLabel={getLabel} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction]);
			useLayoutEffect.mock.calls[0][0]();
			expect(ref.current).toBeNull();
			expect(querySelectorAll.mock.calls).toEqual([['.ListSelectorDialog__list > *']]);
			expect(moveEffect.mock.calls).toEqual([[element, 'r-foo']]);
		});
	});
});
