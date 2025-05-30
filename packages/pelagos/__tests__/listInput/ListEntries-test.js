import {useEffect} from 'react';
import {shallow} from 'enzyme';
import debounce from 'lodash-es/debounce';

import ListEntries from '../../src/listInput/ListEntries';
import renderListItem from '../../src/listItems/renderListItem';
import scrollIntoView from '../../src/functions/scrollIntoView';
import moveListItem from '../../src/functions/moveListItem';
import useRandomId from '../../src/hooks/useRandomId';
import useReorder from '../../src/hooks/useReorder';

jest.unmock('../../src/listInput/ListEntries');

jest.mock('lodash-es/debounce', () => jest.fn((f) => ((f.cancel = jest.fn()), f)));

useRandomId.mockReturnValue('random-id');

const anyFunction = expect.any(Function);

const list = [
	{id: '0', name: 'test0'},
	{id: '1', name: 'test1'},
];
const getId = (i) => i.id;
const getName = (i) => i.name;
const onReorder = jest.fn();

const querySelector = jest.fn();
global.document = {querySelector};

describe('ListEntries', () => {
	describe('rendering', () => {
		beforeEach(() => useReorder.mockReturnValueOnce([]));

		it('renders expected elements', () => {
			const wrapper = shallow(
				<ListEntries
					id="test"
					className="TestClass"
					list={[{id: '0', name: 'test'}]}
					getItemKey={getId}
					getItemName={getName}
					renderItem={(i) => <div>{i.name}</div>}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when renderItem is not set', () => {
			renderListItem.mockReturnValue(<div>test</div>);
			const wrapper = shallow(
				<ListEntries id="test" list={[{id: '0', name: 'test'}]} getItemKey={getId} getItemName={getName} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(renderListItem.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when the item has className', () => {
			const wrapper = shallow(
				<ListEntries
					id="test"
					list={[{id: '0', name: 'test'}]}
					getItemKey={getId}
					getItemName={getName}
					renderItem={(i) => <div className="TestClass">{i.name}</div>}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when highlightKey is set', () => {
			const wrapper = shallow(
				<ListEntries
					id="test"
					highlightKey="0"
					list={[{id: '0', name: 'test'}]}
					getItemKey={getId}
					getItemName={getName}
					renderItem={(i) => <div>{i.name}</div>}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when column is set', () => {
			const wrapper = shallow(
				<ListEntries
					id="test"
					list={[{id: '0', name: 'test'}]}
					column
					getItemKey={getId}
					getItemName={getName}
					renderItem={(i) => <div>{i.name}</div>}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when reorderable is set', () => {
			const wrapper = shallow(
				<ListEntries
					id="test"
					list={[{id: '0', name: 'test'}]}
					reorderable
					getItemKey={getId}
					getItemName={getName}
					renderItem={(i) => <div>{i.name}</div>}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when reorderable is numbers', () => {
			const wrapper = shallow(
				<ListEntries
					id="test"
					list={[{id: '0', name: 'test'}]}
					reorderable="numbers"
					getItemKey={getId}
					getItemName={getName}
					renderItem={(i) => <div>{i.name}</div>}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onRemoveClick when the remove button is clicked', () => {
			const onRemoveClick = jest.fn();
			const item = {id: '0', name: 'test'};
			const live = {};
			useReorder.mockReturnValueOnce([null, {current: live}]);
			const wrapper = shallow(
				<ListEntries
					id="test"
					list={[item]}
					getItemKey={getId}
					getItemName={getName}
					renderItem={(i) => <div>{i.name}</div>}
					onRemoveClick={onRemoveClick}
				/>
			);
			wrapper.find('ul').simulate('click', {target: {closest: () => ({dataset: {index: '0'}})}});
			expect(onRemoveClick.mock.calls).toEqual([[item, 0]]);
			expect(live.textContent).toBe('test removed');
		});

		it('does not call onRemoveClick when the list is clicked outside', () => {
			useReorder.mockReturnValueOnce([]);
			const onRemoveClick = jest.fn();
			const item = {id: '0', name: 'test'};
			const wrapper = shallow(
				<ListEntries
					id="test"
					list={[item]}
					getItemKey={getId}
					getItemName={getName}
					renderItem={(i) => <div>{i.name}</div>}
					onRemoveClick={onRemoveClick}
				/>
			);
			wrapper.find('ul').simulate('click', {target: {closest: () => null}});
			expect(onRemoveClick.mock.calls).toEqual([]);
		});

		it('calls scrollIntoView when highlightKey is set and the element is found', () => {
			useReorder.mockReturnValueOnce([]);
			const onHighlightClear = jest.fn();
			const element = {};
			querySelector.mockReturnValue(element);
			shallow(
				<ListEntries
					id="test"
					highlightKey="0"
					list={[{id: '0', name: 'test'}]}
					getItemKey={getId}
					getItemName={getName}
					renderItem={(i) => <div>{i.name}</div>}
					onHighlightClear={onHighlightClear}
				/>
			);
			expect(useEffect.mock.calls).toEqual([[expect.any(Function), ['0', onHighlightClear]]]);
			const debounced = debounce.mock.results[0].value;
			expect(debounced).toBe(onHighlightClear);

			expect(useEffect.mock.calls[0][0]()).toBe(debounced.cancel);
			expect(querySelector.mock.calls).toEqual([['.ListEntries__item--highlight']]);
			expect(scrollIntoView.mock.calls).toEqual([[element, {smooth: true, duration: 150}]]);
			expect(onHighlightClear).toHaveBeenCalledTimes(1);
		});

		it('does not call scrollIntoView when highlightKey is set and the element is not found', () => {
			useReorder.mockReturnValueOnce([]);
			const onHighlightClear = jest.fn();
			querySelector.mockReturnValue(null);
			shallow(
				<ListEntries
					id="test"
					highlightKey="1"
					list={[{id: '0', name: 'test'}]}
					getItemKey={getId}
					getItemName={getName}
					renderItem={(i) => <div>{i.name}</div>}
					onHighlightClear={onHighlightClear}
				/>
			);
			useEffect.mock.calls[0][0]();
			expect(querySelector.mock.calls).toEqual([['.ListEntries__item--highlight']]);
			expect(scrollIntoView).not.toHaveBeenCalled();
			expect(onHighlightClear).toHaveBeenCalledTimes(1);
		});

		it('does not call querySelector when highlightKey is not set', () => {
			useReorder.mockReturnValueOnce([]);
			const onHighlightClear = jest.fn();
			shallow(
				<ListEntries
					id="test"
					list={[{id: '0', name: 'test'}]}
					getItemKey={getId}
					getItemName={getName}
					renderItem={(i) => <div>{i.name}</div>}
					onHighlightClear={onHighlightClear}
				/>
			);
			useEffect.mock.calls[0][0]();
			expect(querySelector).not.toHaveBeenCalled();
			expect(onHighlightClear).not.toHaveBeenCalled();
		});

		it('adds a reorder handler', () => {
			useReorder.mockReturnValueOnce([]);
			shallow(
				<ListEntries
					list={list}
					getItemKey={getId}
					getItemName={getName}
					renderItem={(i) => <div>{i.name}</div>}
					onReorder={onReorder}
				/>
			);
			expect(useReorder.mock.calls).toEqual([
				['.ListEntries__listItem', '.ListEntries__entry', 2, anyFunction, anyFunction],
			]);
			expect(useReorder.mock.calls[0][3]({dataset: {index: '0'}})).toBe('test0');
			useReorder.mock.calls[0][4](0, 1);
			expect(moveListItem.mock.calls).toEqual([[list, 0, 1]]);
		});
	});
});
