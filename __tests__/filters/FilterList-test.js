import React, {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import FilterList from '../../src/filters/FilterList';
import addResizeObserver from '../../src/functions/addResizeObserver';

jest.unmock('../../src/filters/FilterList');
jest.unmock('../../src/strings');

const FilterEditor = () => <></>;

describe('FilterList', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<FilterList />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when filters are set', () => {
			const getFilterTitle = jest.fn();
			const getValues = jest.fn();
			const filters = {
				view: [{id: 'a'}, {id: 'abc'}],
				zoneName: ['b'],
			};
			const views = ['a', 'abc'];

			const wrapper = shallow(
				<FilterList
					filters={filters}
					views={views}
					excludedKeys={[]}
					getFilterTitle={getFilterTitle}
					getValues={getValues}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when filter is set', () => {
			const getFilterTitle = jest.fn();
			const getValues = jest.fn();
			const filters = {view: ['abc']};
			const setFilter = jest.fn();
			useState.mockReturnValue(['view', setFilter]);
			const wrapper = shallow(
				<FilterList
					filters={filters}
					excludedKeys={[]}
					getFilterTitle={getFilterTitle}
					getValues={getValues}
					filterEditor={FilterEditor}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when filter key is excluded', () => {
			const getFilterTitle = jest.fn();
			const getValues = jest.fn();
			const filters = {view: ['abc']};
			const setFilter = jest.fn();
			useState.mockReturnValue(['view', setFilter]);
			const wrapper = shallow(
				<FilterList
					filters={filters}
					excludedKeys={['view']}
					getFilterTitle={getFilterTitle}
					getValues={getValues}
					filterEditor={FilterEditor}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onApply with null when a remove button is clicked', () => {
			const getFilterTitle = jest.fn();
			const getValues = jest.fn();
			const filters = {view: ['abc']};
			const onApply = jest.fn();
			const remove = {dataset: {key: 'view'}};
			const event = {
				target: {
					closest: jest.fn().mockReturnValueOnce(remove),
				},
				stopPropagation: jest.fn(),
			};
			const wrapper = shallow(
				<FilterList
					filters={filters}
					onApply={onApply}
					excludedKeys={[]}
					getFilterTitle={getFilterTitle}
					getValues={getValues}
					filterEditor={FilterEditor}
				/>
			);
			wrapper.find('[onMouseDown]').simulate('mousedown', event);
			expect(event.target.closest.mock.calls).toEqual([['[data-kind="remove"]']]);
			expect(event.stopPropagation.mock.calls).toEqual([[]]);
			expect(onApply.mock.calls).toEqual([['view', null]]);
		});

		it('calls setFilter when a filter button is clicked', () => {
			const getFilterTitle = jest.fn();
			const getValues = jest.fn();
			const filters = {view: ['abc']};
			const setFilter = jest.fn();
			const item = {dataset: {key: 'view'}};
			const event = {
				target: {
					closest: jest
						.fn()
						.mockReturnValueOnce(null)
						.mockReturnValueOnce(item),
				},
				stopPropagation: jest.fn(),
			};
			useState.mockReturnValue([null, setFilter]);
			const wrapper = shallow(
				<FilterList filters={filters} getFilterTitle={getFilterTitle} getValues={getValues} excludedKeys={[]} />
			);
			wrapper.find('[onMouseDown]').simulate('mousedown', event);
			expect(event.target.closest.mock.calls).toEqual([['[data-kind="remove"]'], ['[data-kind="item"]']]);
			expect(event.stopPropagation.mock.calls).toEqual([[]]);
			expect(setFilter.mock.calls).toEqual([['view']]);
		});

		it('does not call setFilter when no button is clicked', () => {
			const getFilterTitle = jest.fn();
			const getValues = jest.fn();
			const filters = {view: ['abc']};
			const setFilter = jest.fn();
			const event = {
				target: {
					closest: jest.fn().mockReturnValueOnce(null),
				},
				stopPropagation: jest.fn(),
			};
			useState.mockReturnValue([null, setFilter]);
			const wrapper = shallow(
				<FilterList filters={filters} getFilterTitle={getFilterTitle} getValues={getValues} excludedKeys={[]} />
			);
			wrapper.find('[onMouseDown]').simulate('mousedown', event);
			expect(event.target.closest.mock.calls).toEqual([['[data-kind="remove"]'], ['[data-kind="item"]']]);
			expect(event.stopPropagation.mock.calls).toEqual([]);
			expect(setFilter.mock.calls).toEqual([]);
		});

		it('scrolls left when the left arrow is clicked', () => {
			const current = {scrollLeft: 500};
			useRef.mockReturnValue({current});
			const wrapper = shallow(<FilterList />);
			wrapper.find('.FilterList__scrollLeft').simulate('click');
			expect(current.scrollLeft).toBe(400);
		});

		it('scrolls right when the right arrow is clicked', () => {
			const current = {scrollLeft: 500};
			useRef.mockReturnValue({current});
			const wrapper = shallow(<FilterList />);
			wrapper.find('.FilterList__scrollRight').simulate('click');
			expect(current.scrollLeft).toBe(600);
		});

		it('adds and removes resize observer', () => {
			const rect = {width: 50};
			const current = {
				firstChild: {scrollWidth: 100},
				previousSibling: {classList: {add: jest.fn()}},
				nextSibling: {classList: {add: jest.fn()}},
			};
			useRef.mockReturnValue({current});
			shallow(<FilterList />);
			expect(useEffect).toHaveBeenCalledTimes(2);
			useEffect.mock.calls[0][0]();
			expect(addResizeObserver.mock.calls).toEqual([[current, expect.any(Function)]]);
			addResizeObserver.mock.calls[0][1](rect);
			expect(current.previousSibling.classList.add.mock.calls).toEqual([['FilterList__scrollLeft--visible']]);
			expect(current.nextSibling.classList.add.mock.calls).toEqual([['FilterList__scrollRight--visible']]);
		});

		it('removes chevrons when width is less', () => {
			const rect = {width: 100};
			const current = {
				getBoundingClientRect: jest.fn().mockReturnValue(rect),
				firstChild: {scrollWidth: 50},
				previousSibling: {classList: {remove: jest.fn()}},
				nextSibling: {classList: {remove: jest.fn()}},
			};
			useRef.mockReturnValue({current});
			shallow(<FilterList />);
			useEffect.mock.calls[1][0]();
			expect(current.previousSibling.classList.remove.mock.calls).toEqual([['FilterList__scrollLeft--visible']]);
			expect(current.nextSibling.classList.remove.mock.calls).toEqual([['FilterList__scrollRight--visible']]);
		});

		it('calls setFilter when the editor is closed', () => {
			const getFilterTitle = jest.fn();
			const getValues = jest.fn();
			const filters = {view: ['abc']};
			const setFilter = jest.fn();
			useState.mockReturnValue(['view', setFilter]);
			const wrapper = shallow(
				<FilterList
					filters={filters}
					excludedKeys={[]}
					getFilterTitle={getFilterTitle}
					getValues={getValues}
					filterEditor={FilterEditor}
				/>
			);
			wrapper.find('FilterEditor').simulate('close');
			expect(setFilter.mock.calls).toEqual([[null]]);
		});

		it('calls onApply when the editor is saved', () => {
			const getFilterTitle = jest.fn();
			const getValues = jest.fn();
			const filters = {view: ['abc']};
			const values = ['x'];
			const setFilter = jest.fn();
			const onApply = jest.fn();
			useState.mockReturnValue(['view', setFilter]);
			const wrapper = shallow(
				<FilterList
					filters={filters}
					onApply={onApply}
					excludedKeys={[]}
					getFilterTitle={getFilterTitle}
					getValues={getValues}
					filterEditor={FilterEditor}
				/>
			);
			wrapper.find('FilterEditor').simulate('save', values);
			expect(setFilter.mock.calls).toEqual([[null]]);
			expect(onApply.mock.calls).toEqual([['view', values]]);
		});
	});
});
