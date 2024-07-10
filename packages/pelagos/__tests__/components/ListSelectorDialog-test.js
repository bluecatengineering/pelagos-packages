import {useLayoutEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import ListSelectorDialog from '../../src/components/ListSelectorDialog';
import moveEffect from '../../src/functions/moveEffect';

jest.unmock('../../src/components/ListSelectorDialog');

const anyFunction = expect.any(Function);
const getElementById = jest.fn();

const title = 'Test title';
const emptyText = 'Test empty.';
const allItemsRemovedText = 'Test all items removed.';
const saveText = 'Test save';
const items = ['foo', 'bar'];
const allItems = ['foo', 'bar', 'baz', 'oof'];
const headers = {foo: 'Foo', bar: 'Bar', baz: 'Baz', oof: 'Oof'};
const getLabel = (key) => headers[key];

global.document = {getElementById};

describe('ListSelectorDialog', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<ListSelectorDialog
					title={title}
					emptyText={emptyText}
					allItemsRemovedText={allItemsRemovedText}
					saveText={saveText}
					items={items}
					allItems={allItems}
					getLabel={getLabel}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when defaultItems is set', () => {
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
	});

	describe('behaviour', () => {
		it('restores default values when the restore button is clicked', () => {
			const defaultItems = ['baz'];
			const setItems = jest.fn();
			const live = {};
			const ref = {};
			const querySelectorAll = jest.fn().mockReturnValue([
				{getBoundingClientRect: () => 'r-foo', dataset: {key: 'foo'}},
				{getBoundingClientRect: () => 'r-bar', dataset: {key: 'bar'}},
			]);
			useRef.mockReturnValueOnce(ref).mockReturnValueOnce({current: live});
			useState.mockReturnValueOnce([items, setItems]);
			getElementById.mockReturnValueOnce({querySelectorAll});
			const wrapper = shallow(
				<ListSelectorDialog items={items} allItems={allItems} defaultItems={defaultItems} getLabel={getLabel} />
			);
			wrapper.find('[size="small"]').simulate('click');
			expect(setItems.mock.calls).toEqual([[defaultItems]]);
			expect(live.textContent).toBe('The default settings have been restored.');
			expect(getElementById.mock.calls).toEqual([['listSelector']]);
			expect(querySelectorAll.mock.calls).toEqual([['.ListSelector__list > *']]);
			expect(ref.current).toEqual({
				m: new Map([
					['foo', 'r-foo'],
					['bar', 'r-bar'],
				]),
			});
		});

		it('calls onClose when the close button is clicked', () => {
			const onClose = jest.fn();
			const wrapper = shallow(
				<ListSelectorDialog items={items} allItems={allItems} getLabel={getLabel} onClose={onClose} />
			);
			wrapper.find('#closeDialogBtn').simulate('click');
			expect(onClose.mock.calls).toEqual([[]]);
		});

		it('calls onSave when the update button is clicked', () => {
			const onSave = jest.fn();
			useState.mockReturnValueOnce([items]);
			const wrapper = shallow(
				<ListSelectorDialog items={items} allItems={allItems} getLabel={getLabel} onSave={onSave} />
			);
			wrapper.find('#saveItemsBtn').simulate('click');
			expect(onSave.mock.calls).toEqual([[items]]);
		});

		it('adds a layout effect which does not do anything if animations is null', () => {
			const ref = {};
			useRef.mockReturnValueOnce(ref);
			shallow(<ListSelectorDialog items={items} allItems={allItems} getLabel={getLabel} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction]);
			useLayoutEffect.mock.calls[0][0]();
			expect(ref.current).toBeUndefined();
		});

		it('adds a layout effect which calls expected effects', () => {
			const ref = {current: {m: new Map([['foo', 'r-foo']])}};
			const element = {dataset: {key: 'foo'}};
			const querySelectorAll = jest.fn().mockReturnValue([element]);
			useRef.mockReturnValueOnce(ref);
			getElementById.mockReturnValueOnce({querySelectorAll});
			shallow(<ListSelectorDialog items={items} allItems={allItems} getLabel={getLabel} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction]);
			useLayoutEffect.mock.calls[0][0]();
			expect(ref.current).toBeNull();
			expect(getElementById.mock.calls).toEqual([['listSelector']]);
			expect(querySelectorAll.mock.calls).toEqual([['.ListSelector__list > *']]);
			expect(moveEffect.mock.calls).toEqual([[element, 'r-foo']]);
		});
	});
});
